import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapComponent = ({ apiKey }) => {

  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Bernal&key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);
  const checkAPIKey = async () => {
    if (!location) {
      setStatus("⚠️ Please enter a location.");
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "ok") {
        const { lat, lng } = data.results[0].geometry.location;
        setStatus("✅ API Key is valid!");
        setCoordinates({ lat, lng });
      } else {
        console.log(response, "check")
        setStatus(`❌ Invalid API Key or Location: ${data.status}`);
        setCoordinates(null);
      }
    } catch (error) {
      setStatus("⚠️ Error checking API Key.");
      setCoordinates(null);
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Google Maps API Key Checker</h2>
      <input
        type="text"
        placeholder="Enter location (e.g., New York)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ padding: "10px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={checkAPIKey} style={{ padding: "10px", cursor: "pointer" }}>
        Search
      </button>
      {status && <p>{status}</p>}
        <>
          <p>📍 Coordinates: {coordinates?.lat}, {coordinates?.lng}</p>
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap mapContainerStyle={containerStyle} center={coordinates} zoom={12}>
              <Marker position={coordinates} />
            </GoogleMap>
          </LoadScript>
        </>
    </div>
  );
};

export default MapComponent;