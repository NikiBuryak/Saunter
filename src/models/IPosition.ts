
export type IPosition = google.maps.LatLngLiteral

export interface IMap {
    markers?: IPosition[]
    setDistance?:Function
  }

export type TWayPoints = google.maps.DirectionsWaypoint[]

export interface IMapRef {
  current: google.maps.Map | null;
}