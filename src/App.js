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
  const [categories, setCategories] = useState([
    "Outpatient Radiology",
    "Imaging Centers",
    "Orthopedic Surgery",
    "Chiropractor",
    "Pain Management",
    "Primary Care",
    "General Practitioner",
    "Internal Medicine",
    "Neurology",
    "Oncologist",
  ]);

  const onGoogleApiLoaded = ({ map, maps }) => {
    mapRef.current = map;
    setMapReady(true);
  };
  const onMarkerClick = (e, { markerId, lat, lng }) => {
    mapRef.current.setCenter({ lat, lng });
  };

  const fetchData = async () => {
    let categoryString = categories.join(",");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/get-data?category=${categoryString}`
      );
      setDoctorDatas(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxClick = (val) => {
    const vals = val.split(",");
    const new_categoreis = [...categories];
    vals.map((item) => {
      if (new_categoreis.includes(item)) {
        let index = new_categoreis.indexOf(item);
        new_categoreis.splice(index, 1);
      } else new_categoreis.push(item);
    });
    setCategories(new_categoreis);
  };
  
  const handleDivClick = (event, ctgory) => {
    const checkbox = event.currentTarget.querySelector('.list-item-check');
    checkbox.checked = !checkbox.checked;
    console.log(ctgory)
    handleCheckboxClick(ctgory)
  };

  const getColorId = (ctgory) => {
    let colorId = 0;
    doctorCategories.map((item) => {
      let index = item.value.indexOf(ctgory);
      if (index !== -1) colorId = item.id - 1;
    });
    return colorId;
  };

  useEffect(() => {
    fetchData();
  }, [categories]);

  return (
    <div className="App">
      <main className="main">
        <div className="sidebar">
          <div className="sidebar-list">
            {doctorCategories.map((item, index) => (
              <div className="sidebar-list-item" key={index} onClick={(e) => handleDivClick(e, item.value)}>
                <input
                  className="list-item-check"
                  type="checkbox"
                  onClick={() => handleCheckboxClick(item.value)}
                  defaultChecked
                />
                {item.name}
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: "75%" }}>
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
                colorId={getColorId(item.category)}
              />
            ))}
          </GoogleMap>
        </div>
      </main>
    </div>
  );
}

export default App;
