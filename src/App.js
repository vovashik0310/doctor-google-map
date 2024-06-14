import { useRef, useState, useEffect } from "react";
import axios from "axios";
import GoogleMap from "google-maps-react-markers";
import logo from "./logo.svg";
import "./App.css";
import Marker from "./Marker";
import { doctorCategories } from "./constants";

function App() {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [doctorDatas, setDoctorDatas] = useState([]);

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };
  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log("This is ->", markerId);
    mapRef.current.setCenter({ lat, lng });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/get-data?category=Pain Management`
        );
        setDoctorDatas(response.data);
        console.log("Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <main className="main">
        <div style={{width:'25%'}}>
          {
            doctorCategories.map((item, index) => (
              <div>
                {item.name}
              </div>
            ))
          }

        </div>
        <div style={{width:'75%'}}>
          <GoogleMap
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            defaultCenter={{ lat: 40.7174, lng: -74.043228 }}
            // defaultCenter={{ lat: 51.506, lng: -0.169 }}
            defaultZoom={13}
            options={{}}
            mapMinHeight="100vh"
            mapMinWidth="65vw"
            onGoogleApiLoaded={onGoogleApiLoaded}
            onChange={(map) => console.log("Map moved", map)}
          >
            {doctorDatas.map((item, index) => (
              <Marker
                key={index}
                lat={item.lat}
                lng={item.lng}
                text={index}
                tooltip={item.displayName}
              />
            ))}
          </GoogleMap>
        </div>
      </main>
    </div>
  );
}

export default App;
