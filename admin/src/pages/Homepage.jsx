import React, { useState, useEffect } from 'react';
import { getDocs } from "firebase/firestore";
import { firestore, collection, query, where, setDoc, doc } from '../firebase';
import './HomePage.css'; // Import CSS file for styling

function HomePage() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(firestore, "alert"),
        where("solved", "==", "false")
      );
      
      const querySnapshot = await getDocs(q);
      const alertData = [];
      querySnapshot.forEach((doc) => {
        alertData.push({ id: doc.id, ...doc.data() });
      });
      
      setAlerts(alertData);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Alerts</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Current Latitude</th>
            <th>Current Longitude</th>
            <th>Percentage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.model}</td>
              <td>{alert.latitude}</td>
              <td>{alert.longitude}</td>
              <td>{alert.percent}</td>
              <td>
                <button onClick={async () => {
                  const userCollection = "alert";
                  const userRef = doc(firestore, userCollection, alert.id);
                  await setDoc(userRef, { solved: 'true' }, { merge: true });
                  window.location.reload();
                }}>
                  Solve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
