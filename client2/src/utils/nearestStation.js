import { calculateCoordinates } from "./matrix";
import { firestore, doc, getDoc, collection, query, where } from "../firebase";
import { getDocs } from "firebase/firestore";

export async function getNearestStation(lat, lon, distance) {
  const arr = calculateCoordinates(lat, lon, distance);

  const chargingPoints = await fetchChargingPoints(arr);

  chargingPoints.sort((a, b) => {
    if (a.latitude === b.latitude) {
      return a.longitude - b.longitude;
    }
    return a.latitude - b.latitude;
  });

  console.log(chargingPoints);
}

async function fetchChargingPoints(arr) {
  try {
    const q = query(
      collection(firestore, "chargingpoints"),
      where("state", "==", "Maharashtra")
    );
    const querySnapshot = await getDocs(q);
    const chargingPoints = [];
    querySnapshot.forEach((doc) => {
      chargingPoints.push(doc.data());
    });

    const response = filterChargingPoints(chargingPoints, arr);

    // console.log(response);

    return response;
  } catch (error) {
    console.error("Error fetching charging points:", error);
    return [];
  }
}

function filterChargingPoints(chargingPoints, coordinates) {
  return chargingPoints.filter((point) => {
    return (
      point.latitude >= coordinates[6].lat &&
      point.latitude <= coordinates[5].lat &&
      point.longitude >= coordinates[6].lon &&
      point.longitude <= coordinates[5].lon
    );
  });
}
