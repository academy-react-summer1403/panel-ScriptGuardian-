// MyMap component

import { useEffect, React } from "react";
import { useMap } from "react-leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

const CustomMap = ({ markerPosition, setMarkerPosition }) => {
  console.log(markerPosition, "markerPosition in MyMap");

  return (
    <MapContainer
      center={[markerPosition.initialLatitude, markerPosition.initialLongitude]}
      zoom={10}
      style={{ height: "200px", width: "100%", direction: "rtl" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        key={`${markerPosition.initialLatitude}-${markerPosition.initialLongitude}`}
        position={[
          markerPosition.initialLatitude,
          markerPosition.initialLongitude,
        ]}
      >
        <Popup>موقعیت</Popup>
      </Marker>

      <ChangeMarkerPosition setMarkerPosition={setMarkerPosition} />
    </MapContainer>
  );
};

export default CustomMap;
