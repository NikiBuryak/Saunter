import { useEffect, useMemo, useState, useRef } from "react";
import { IMap, IPosition, TWayPoints, IMapRef } from "../models/IPosition";
import { Box, Typography, Button } from "@mui/material";
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import env from "react-dotenv";
import { current } from "@reduxjs/toolkit";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const Map: React.FC<IMap> = ({ markers, setDistance }) => {
  const [mapMarkers, setMapMarkers] = useState<IPosition[] | undefined>(
    markers
  );

  const [isActive, setIsActive] = useState<boolean>(false);

  const refMap: IMapRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.GOOGLE_API_KEY,
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

  const handleMapClick = ({ latLng }: google.maps.MapMouseEvent): void => {
    const lat: number | undefined = latLng?.lat();
    const lng: number | undefined = latLng?.lng();

    if (lat && lng) {
      const newMarker: IPosition = {
        lat,
        lng,
      };

      const newMarkers = mapMarkers?.length
        ? [...mapMarkers, newMarker]
        : [newMarker];

      setMapMarkers((state) => (state = newMarkers));
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
    <GoogleMap
      zoom={10}
      center={centerMap}
      onLoad={handleLoadMap}
      onUnmount={handleUnmountMap}
      mapContainerStyle={{
        width: "100%",
        height: "400px",
      }}
      options={{
        clickableIcons: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        fullscreenControl: true,
        mapId: env.GOOGLE_MAP_ID,
      }}
      {...(!markers?.length && isActive && { onClick: handleMapClick })}
    >
      {!isActive && (
        <Button
          variant="outlined"
          startIcon={<LocationOnIcon />}
          onClick={() => setIsActive(!isActive)}
          sx={{
            left: "50%",
            top: "10px",
            transform: "translateX(-50%)",
          }}
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
  );
};
