import { useRef, useState, useEffect } from "react";
import axios from "axios";
import GoogleMap from "google-maps-react-markers";
import logo from "./logo.svg";
import "./App.css";
import Marker from "./components/Marker";
import { doctorCategories, mapCenter, mapStyles } from "./config/constants";
import LinkItem from "./components/LinkItem";
import { getDistance } from "./config/constants";

function App() {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const [infoLocation, setInfolocation] = useState(mapCenter);
  const [infoDoctorData, setInfoDoctorData] = useState(null);
  const [doctorDatas, setDoctorDatas] = useState([]);
  const [categories, setCategories] = useState([
    "Outpatient Radiology",
    "Imaging Centers",
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
    console.log(event.target);
    if (event.target.type === "checkbox") {
      const checkbox = event.target;
      console.log(checkbox.checked);
      checkbox.checked = checkbox.checked;
    } else {
      const checkbox = event.target.querySelector(".list-item-check");
      checkbox.checked = !checkbox.checked;
    }
    handleCheckboxClick(ctgory);
  };

  const handleMarkerClick = (item, location) => {
    console.log(location);
    setInfolocation(location);
    setInfoDoctorData(item);
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
              <LinkItem
                name={item.name}
                key={index}
                isDefaultChecked={index === 0}
                color={item.color}
                onItemClick={(e) => handleDivClick(e, item.value)}
                onCheckboxClick={(e) => handleCheckboxClick(item.value)}
              />
            ))}
          </div>
          <div className="total-list">Total : {doctorDatas.length}</div>
        </div>
        <div style={{ width: "75%" }}>
          <GoogleMap
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            defaultCenter={mapCenter}
            defaultZoom={13}
            options={{
              styles: mapStyles,
              disableDefaultUI: true,
              zoomControl: true,
              clickableIcons: false,
              gestureHandling: "greedy",
              // controlSize: isMobile ? 20 : 40,
            }}
            mapMinHeight="100vh"
            mapMinWidth="65vw"
            onGoogleApiLoaded={onGoogleApiLoaded}
          >
            {infoDoctorData && (
              <div
                lat={infoLocation.lat}
                lng={infoLocation.lng}
                className="info-doctor"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="info-doctor-close-icon"
                  onClick={() => setInfoDoctorData(null)}
                >
                  <path
                    d="M18 6L6 18"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="info-doctor-name">
                  {infoDoctorData.displayName}
                </div>
                <div className="info-doctor-address">
                  {infoDoctorData.address}
                </div>
                <div className="info-doctor-distance">
                  {getDistance(
                    mapCenter.lat,
                    mapCenter.lng,
                    infoLocation.lat,
                    infoLocation.lng
                  )}{" "}
                  miles
                </div>
              </div>
            )}
            <Marker lat={mapCenter.lat} lng={mapCenter.lng} />
            {doctorDatas.map((item, index) => (
              <Marker
                key={index}
                lat={item.lat}
                lng={item.lng}
                text={index}
                tooltip={item.displayName}
                colorId={getColorId(item.category)}
                onClick={(e) =>
                  handleMarkerClick(item, { lat: item.lat, lng: item.lng })
                }
              />
            ))}
          </GoogleMap>
        </div>
      </main>
    </div>
  );
}

export default App;
