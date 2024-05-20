import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "../src/App.css";

const Map = (props) => {
  const [position, setPosition] = useState(null);
  const [Lat, setLat] = useState(null);
  const [Lon, setLon] = useState(null);
  console.log(props.address)
  const address =`${props.address}, Israel`;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
        );
        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setLat(parseFloat(lat));
          setLon(parseFloat(lon));
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error("Error fetching address coordinates:", error);
      }
    };
    fetchCoordinates();
  }, [address]);

  console.log(position)

  return (
    <div id="map_container" style={{ height: '100px', width: '250px' }}>
      {position && (
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Coordinates: {Lat}, {Lon}</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
