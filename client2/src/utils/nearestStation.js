import { calculateCoordinates } from "./matrix";
import { firestore, doc, getDoc, collection, query, where } from "../firebase";
import { getDocs } from "firebase/firestore";
import axios from "axios";

export async function getNearestStation(lat, lon, distance,destLat,destLon) {
  const arr = calculateCoordinates(lat, lon, distance);
  console.log("arr", arr);
  const chargingPoints = await fetchChargingPoints(arr);

  let min = 1000000;
  let minIndex = 0;
  chargingPoints.map((points,index) =>{
    let mins = Math.sqrt(Math.pow(points.lattitude - destLat,2) + Math.pow(points.longitude - destLon,2));

    if(mins < min){
      min = mins;
      minIndex = index;
    }

    
  });
  // console.log(chargingPoints[minIndex]);
  return chargingPoints[minIndex];
}

export async function getAllNearestStation (lat, lon, distance) {
  const arr = calculateCoordinates(lat, lon, distance);
  const chargingPoints = await fetchChargingPoints(arr);

  console.log(chargingPoints)
  return chargingPoints;

}

async function fetchChargingPoints(arr) {
  try {
    // const q = query(
    //   collection(firestore, "chargingpoints"),
    //   where("state", "==", "Maharashtra")
    // );

    const q = await axios.get(
      "https://36hdwrzm-3000.inc1.devtunnels.ms/stations"
    );

    // console.log("q", q.data);

    const chargingPoints = [];
    q.data.forEach((doc) => {
      chargingPoints.push(doc);
    });
    console.log("charging points", chargingPoints);
    const response = filterChargingPoints(chargingPoints, arr);

    // console.log("response", response);

    return response;
  } catch (error) {
    console.error("Error fetching charging points:", error);
    return [];
  }
}

function filterChargingPoints(chargingPoints, coordinates) {
  return chargingPoints.filter((point) => {
    return (
      point.lattitude >= coordinates[6].lat &&
      point.lattitude <= coordinates[5].lat &&
      point.longitude >= coordinates[6].lon &&
      point.longitude <= coordinates[5].lon
    );
  });
}
