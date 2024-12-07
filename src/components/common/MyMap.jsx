import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const UpdateMapSize = () => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return null;
};

const ChangeMarkerPosition = ({ setMarkerPosition }) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setMarkerPosition({
        latitude: lat,
        longitude: lng,
      });
    },
  });

  return null;
};

const MyMap = () => {
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 36.564139,
    longitude: 53.060789,
  });

  return (
    <MapContainer
      center={[markerPosition.latitude, markerPosition.longitude]}
      zoom={10}
      style={{ height: "442px", width: "675px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={[markerPosition.latitude, markerPosition.longitude]}>
        <Popup>آدرس خانه</Popup>
      </Marker>

      <Marker position={[36.564139, 51.300789]}>
        <Popup>آدرس خانه</Popup>
      </Marker>
      <ChangeMarkerPosition setMarkerPosition={setMarkerPosition} />
      <UpdateMapSize />
    </MapContainer>
  );
};

export default MyMap;
