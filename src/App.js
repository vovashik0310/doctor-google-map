import { useRef, useState, useEffect } from 'react';
import axios from 'axios'
import GoogleMap, {Marker} from 'google-maps-react-markers';
import logo from './logo.svg';
import './App.css';

function App() {
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [doctorData, setDoctorData] = useState([])

  const onGoogleApiLoaded = ({map, maps}) => {
    mapRef.current = map
    setMapReady(true)
  }
  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log('This is ->', markerId)
    mapRef.current.setCenter({ lat, lng })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/get-data?category=Pain Management`);
        console.log('Data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

  return (
    <div className="App">
      <header className="App-header">

      </header>
      <main>

      <GoogleMap
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        defaultCenter={{ lat: 40.717400, lng: -74.043228 }}
        defaultZoom={5}
        options={{}}
        mapMinHeight="90vh"
        onGoogleApiLoaded={onGoogleApiLoaded}
        onChange={(map) => console.log('Map moved', map)}
      >
        {doctorData?.map((item , index) => (
          <Marker
            key={index}
            lat={item.lat}
            lng={item.lng}
            markerId={item.displayName}
            onClick={onMarkerClick} // you need to manage this prop on your Marker component!
            // draggable={true}
            // onDragStart={(e, { latLng }) => {}}
            // onDrag={(e, { latLng }) => {}}
            // onDragEnd={(e, { latLng }) => {}}
          />
        ))}
      </GoogleMap>
      </main>
    </div>
  );
}

export default App;
