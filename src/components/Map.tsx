import { useMemo, useState, useRef } from "react";
import { TPosition, TWayPoints } from "../models/TPosition";
import { Box, Typography, Button } from "@mui/material";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useAppDispatch } from "../hooks/redux";
import { pathSlice } from "../store/reducers/UseSlice";

interface IMap {
  markers?: TPosition[];
  setDistance?: Function;
}

interface IMapRef {
  current: google.maps.Map | null;
}

export const Map: React.FC<IMap> = ({ markers, setDistance }) => {
  const [mapMarkers, setMapMarkers] = useState<TPosition[] | undefined>(
    markers
  );
  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { setMarkers } = pathSlice.actions;
  const refMap: IMapRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyACXTOGkqHMjmtE9rk4Lm4dFzvOVhZap8Y",
  });

  const centerMap = useMemo<google.maps.LatLngLiteral>(
    () => ({
      lat: 48.464717,
      lng: 35.046183,
    }),
    []
  );

  const handleLoadMap = (map: google.maps.Map) => {
    refMap.current = map;
  };

  const handleUnmountMap = (el: google.maps.Map) => {
    refMap.current = null;
  };

  const handleMapClick = ({ latLng }: google.maps.MapMouseEvent) => {
    const lat: number | undefined = latLng?.lat();
    const lng: number | undefined = latLng?.lng();

    if (lat && lng) {
      const newMarker: TPosition = {
        lat,
        lng,
      };

      const newMarkers = mapMarkers?.length
        ? [...mapMarkers, newMarker]
        : [newMarker];

      setMapMarkers((state) => (state = newMarkers));
      dispatch(setMarkers(newMarkers));
    }
  };

  if (!isLoaded) {
    return <Typography variant="caption">Loading...</Typography>;
  }

  const getDistance = () => {
    let props: google.maps.DirectionsRequest;

    let waypoints: TWayPoints = [];

    if (mapMarkers && mapMarkers?.length > 1) {
      waypoints = mapMarkers
        .slice(1, mapMarkers.length - 1)
        .map((marker) => ({ location: marker }));
      props = {
        origin: mapMarkers[0],
        destination: mapMarkers[mapMarkers.length - 1],
        travelMode: google.maps.TravelMode.WALKING,
        waypoints,
      };
      const directionService = new google.maps.DirectionsService();
      directionService
        .route(props)
        .then((result) => {
          showRoute(result);
          getTotal(result);
        })
        .catch((er) => console.error(er));
    }
  };

  const showRoute = (result: google.maps.DirectionsResult): void => {
    const directionRenderer: google.maps.DirectionsRenderer =
      new google.maps.DirectionsRenderer({
        map: refMap.current,
        markerOptions: {
          opacity: 0,
          clickable: false,
        },
      });
    directionRenderer.setDirections(result);
  };

  const getTotal = (result: google.maps.DirectionsResult) => {
    let total: number = 0;
    const myRoute = result.routes[0];
    myRoute.legs.forEach((el, index) => {
      total += myRoute.legs[index]!.distance!.value;
    });
    total = total / 1000;
    setDistance && setDistance(total.toFixed(2));
  };

  if (mapMarkers && mapMarkers?.length > 1) {
    getDistance();
  }

  return (
    <Box sx={mapWrapperStyles}>
      <GoogleMap
        zoom={10}
        center={centerMap}
        onLoad={handleLoadMap}
        onUnmount={handleUnmountMap}
        mapContainerStyle={mapStyles}
        options={mapOptions}
        {...(!markers?.length && isActive && { onClick: handleMapClick })}
      >
        {!markers && !isActive && (
          <Button
            variant="outlined"
            startIcon={<LocationOnIcon />}
            onClick={() => setIsActive(!isActive)}
            sx={markerStyles}
          >
            Add Marker
          </Button>
        )}

        {mapMarkers?.map((mapMarker, index) => (
          <MarkerF
            position={{ lat: mapMarker.lat, lng: mapMarker.lng }}
            key={index}
          />
        ))}
      </GoogleMap>
    </Box>
  );
};

const mapStyles = {
  width: "100%",
  height: "400px",
};

const mapOptions = {
  clickableIcons: false,
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  mapId: "8ac5887943cb7d16",
};
const mapWrapperStyles = {
  border: "1px solid #7c7c7c",
  height: "100%",
};

const markerStyles = {
  left: "50%",
  top: "10px",
  transform: "translateX(-50%)",
};
