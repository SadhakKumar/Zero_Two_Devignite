import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MapboxComponent from "../components/MapboxCpmponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";

import { getNearestStation } from "../utils/nearestStation";
import { firestore, doc, getDoc } from "../firebase";


const GetPath = () => {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [path, setPath] = useState([]);
  const [time, setTime] = useState([0]);
  const navigate = useNavigate();
  const [polyPoints, setPolyPoints] = useState([]);

  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [cordinates, setCordinates] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [estimatedDistance, setEstimatedDistance] = useState(0);
  const [actualDistance, setActualDistance] = useState(0);
  const [latLon, setLatLon] = useState();

  console.log("source", source);
  console.log("destination", destination);

  const getCurrentLatLon = async () => {
    const docRef = doc(firestore, "users", "at450x");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLatLon({
        lat: docSnap.data().lat,
        lan: docSnap.data().lon,
      });
    }

    console.log(latLon);
  };

  useEffect(() => {
    getLocationName(source[1], source[0], setSourceCity);
    getLocationName(destination[1], destination[0], setDestinationCity);
  }, [source, destination]);

  const getLocationName = async (lat, lon, fn) => {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );

    const data = await response.json();
    fn(data.city);
  };

  const getCordinates = async () => {
    var url = `http://router.project-osrm.org/route/v1/driving/${source[1]},${source[0]};${destination[1]},${destination[0]}?steps=true&annotations=true&geometries=geojson&overview=full`;

    const mapBoxUrl =
      "https://api.mapbox.com/directions/v5/mapbox/driving/72.894434%2C19.049821%3B73.867274%2C18.470933?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoibXJ1bmFsMTIzNDU2Nzg5IiwiYSI6ImNsbWhzbWF2cTBzajAzcXIybTVoa3g1anQifQ.66Fu05Ii8-NVd-w-C-FSgA";
    const response = await fetch(mapBoxUrl);
    const data = await response.json();
    console.log("new Data", data);
    setActualDistance(Number(data.routes[0].distance) / 1000);
    console.log("data", data.routes[0].geometry.coordinates.length);

    const poly = data.routes[0].geometry.coordinates;
    setPolyPoints([...poly]);
    const arr = [];
    const finalData = data.routes[0].geometry.coordinates
      .map((data, i) => {
        return { lat: data[1], lon: data[0] };
      })
      .filter((data, i) => {
        return i % 200 === 0;
      });
    console.log("cordinates", finalData);
    setCordinates([...finalData]);
    console.log("cordinates", cordinates);
    if (cordinates.length > 0) {
      let i = 0;
      setLoading(true);
      // for (i; i < cordinates.length; i++) {
      //   const res = await getNearestLocation(
      //     cordinates[i].lat,
      //     cordinates[i].lon
      //   );

      //   arr.push(res);
      //  }
    }
    console.log("polyPoints", polyPoints, arr);
    setLoading(false);
    if (polyPoints.length > 0)
      navigate("/plans", { state: { polyPoints, arr } });
  };

  const getPredDistance = async (lat, lon) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict_range",
        {
          model: "Ampere",
          battery: 70,
          mode: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setEstimatedDistance(response.data.estimated_range);
      // Handle response data here
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    }
  };

  const getNearestLocation = async (lat, lon) => {
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng",
      params: {
        longitude: lon,
        latitude: lat,
        lunit: "km",
        currency: "USD",
        limit: 1,
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": "dd52b6c22amsh14abec8837003cap10e8f7jsnc8a3530dc0a9",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }

    // const promises = cordinates.map((data, i) => {
    //   const { lat, lon } = data;
    //   return axios
    //     .get(
    //       `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${lon}.19553&latitude=${lat}`,
    //       {
    //         headers: {
    //           "X-RapidAPI-Key":
    //             "5f506045admsh19d29b93bba57d7p1a7e0djsne0bcbd6bbb86",

    //         },
    //       }
    //     )
    //     .then((response) => {
    //       return response;
    //     })
    //     .catch((err) => {
    //       console.log("err", err);
    //     });
    // });
    // console.log("promises", promises);
    // Promise.all(promises).then((results) => {
    //   console.log("results", results);
    //   const videos = results.map((result) => result);
    // });
  };

  const videoUrls = async () => {
    let i = 0;
    let urllist = [];
    for (i; i < cordinates.length; i++) {
      const response = await axios.get(
        `https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?longitude=${cordinates[i].lon}.19553&latitude=${cordinates[i].lat}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "dd52b6c22amsh14abec8837003cap10e8f7jsnc8a3530dc0a9",
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
          },
        }
      );
      console.log("response", response);
      const json = response.data;
      console.log("json", json);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
       <div className="navbar md:bg-transparent
       overflow-x-hidden
       bg-[#0f1021] md:shadow-none shadow-white shadow-sm">
          <div className=" flex-1 z-1000 ">
          <h2 className="text-xl md:text-3xl text-slate-200 font-bold ml-4">
            Select Source & Destination
          </h2>
          </div>
          <button
            onClick={async () => {
              getCordinates();
              await getPredDistance();

              console.log(actualDistance);
              console.log(estimatedDistance);

              if (actualDistance === 0 && estimatedDistance === 0) {
                return;
              }

              if (actualDistance > estimatedDistance) {
                getCurrentLatLon();
                //  alert('You are running out of battery')
                getNearestStation(latLon.lat, latLon.lon, estimatedDistance);
              } else {
                alert("You are good to go");
              }
            }}
            className=" 
    
            btn bg-black text-white
            md:w-[14%]  md:mr-8"
          >
            Get EV Stations ->
          </button>
        </div>


        <div className="w-[98%] mx-auto">
          <MapboxComponent
            setDestination={setDestination}
            setSource={setSource}
            setPath={setPath}
            setTime={setTime}
          />
        </div>
    </div>
  );
};

export default GetPath;
