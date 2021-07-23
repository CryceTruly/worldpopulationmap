type LatLng = { lat: number; lng: number };

export interface Pos {
  lat: number;
  lng: number;
  population?: number;
  name?: string;
  latlng?: LatLng[];
}
