import { calculateCoordinates } from "./matrix";
import { firestore, doc, getDoc, collection, query, where } from "../firebase";
import { getDocs } from "firebase/firestore";
import axios from "axios";

export async function getNearestStation(lat, lon, distance) {
  const arr = calculateCoordinates(lat, lon, distance);
  console.log("arr", arr);
  const chargingPoints = await fetchChargingPoints(arr);

  console.log("charging point", chargingPoints);
  chargingPoints.sort((a, b) => {
    if (a.latitude === b.latitude) {
      return a.longitude - b.longitude;
    }
    return a.latitude - b.latitude;
  });
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

    console.log("q", q.data);

    const chargingPoints = [];
    q.data.forEach((doc) => {
      chargingPoints.push(doc);
    });
    console.log("charging points", chargingPoints);
    const response = filterChargingPoints(chargingPoints, arr);

    console.log("response", response);

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
