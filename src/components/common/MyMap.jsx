// MyMap component

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
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
        initialLatitude: parseFloat(lat),
        initialLongitude: parseFloat(lng),
      });
    },
  });

  return null;
};

const MyMap = ({ markerPosition, setMarkerPosition }) => {
  console.log(markerPosition, "markerPosition in MyMap");

  return (
    <MapContainer
      center={[markerPosition.initialLatitude, markerPosition.initialLongitude]}
      zoom={10}
      style={{ height: "442px", width: "590px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        position={[
          markerPosition.initialLatitude,
          markerPosition.initialLongitude,
        ]}
      >
        <Popup>آدرس خانه</Popup>
      </Marker>

      <ChangeMarkerPosition setMarkerPosition={setMarkerPosition} />
      <UpdateMapSize />
    </MapContainer>
  );
};

export default MyMap;