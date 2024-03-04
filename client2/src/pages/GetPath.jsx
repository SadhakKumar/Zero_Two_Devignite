import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MapboxComponent from "../components/MapboxCpmponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "antd";

import { getNearestStation,getAllNearestStation } from "../utils/nearestStation";
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
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [arr, setArr] = useState([]);

  const [nearestStation, setNearestStation] = useState([]);

  const getCurrentLatLon = async () => {
    const docRef = doc(firestore, "ev", "at450x");
    const docSnap = await getDoc(docRef);

    console.log("docSnap", docSnap.data());

    if (docSnap.exists()) {
      setLat(docSnap.data().lat);
      setLon(docSnap.data().lon);
    }

    console.log({
      lat: lat,
      lon: lon,
    });
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
  const arr1 = [];
  const getCordinates = async () => {
    var url = `http://router.project-osrm.org/route/v1/driving/${source[1]},${source[0]};${destination[1]},${destination[0]}?steps=true&annotations=true&geometries=geojson&overview=full`;

    const mapBoxUrl =
      "https://api.mapbox.com/directions/v5/mapbox/driving/72.894434%2C19.049821%3B73.867274%2C18.470933?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token="API_KEY";
    const response = await fetch(mapBoxUrl);
    const data = await response.json();

    setActualDistance(Number(data.routes[0].distance) / 1000);
    console.log("data", data.routes[0].geometry.coordinates.length);

    const poly = data.routes[0].geometry.coordinates;
    setPolyPoints([...poly]);

    const finalData = data.routes[0].geometry.coordinates
      .map((data, i) => {
        return [data[0], data[1]];
      })
      .filter((data, i) => {
        return i % 200 === 0;
      });

    const allData = data.routes[0].geometry.coordinates.map((data, i) => {
      return [data[0], data[1]];
    });

    setCordinates([...finalData]);
    console.log("cordinates", cordinates);
    if (allData.length > 0) {
      let i = 0;
      setLoading(true);
      for (i; i < allData.length; i++) {
        if (i % 200 === 0) {
          const response = await getAllNearestStation(
            allData[i][1],
            allData[i][0],
            30
          );
          arr1.push(...arr1, ...response);
        }
      }
    }
    setArr(...arr1);
    console.log("arr", arr1);

    setLoading(false);
    // console.log("polyPoints", polyPoints, arr);
    // setLoading(false);
    // if (polyPoints.length > 0)
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
      <div
        className="navbar md:bg-transparent
       overflow-x-hidden
       bg-[#0f1021] md:shadow-none shadow-white shadow-sm"
      >
        <div className=" flex-1 z-1000 ">
          <h2 className="text-xl md:text-3xl text-slate-200 font-bold ml-4">
            Select Source & Destination
          </h2>
        </div>
        <button
          onClick={async () => {
            // getCordinates();
            // await getPredDistance();

            console.log(actualDistance);
            console.log(estimatedDistance);

            // if (actualDistance === 0 && estimatedDistance === 0) {
            //   return;
            // }

            // if (actualDistance > estimatedDistance) {

            getCordinates().then((res) => {
              console.log("get coord res", res);
              getCurrentLatLon().then((res) => {
                console.log("get curr lat res", res);
                if (cordinates.length > 0) {
                  console.log("arr1", arr1);
                  navigate("/plans", {
                    state: { res: new Set(arr1), cordinates },
                  });
                }
              });
            });

            console.log("imp data", {
              arr,
              polyPoints,
            });

            console.log({
              polyPoints,
              arr,
            });
            // setTime(() => {
            //   navigate("/plans", { state: { polyPoints, arr } });
            // }, 8000);
            //  alert('You are running out of battery')
            console.log("latLon", lat);
            if (lat && lon) {
            }
            if (nearestStation.length > 0) {
            }
            // } else {
            //   alert("You are good to go");
            // }
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
