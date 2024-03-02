import React, { useEffect, useState } from 'react'
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";  
import { useNavigate } from "react-router-dom";
import { firestore, doc, getDoc } from "../firebase";
import SingleCard from '../components/SingleCard';
import './CarHomePage.css'
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';



const carObj = {
  title: "Battery",
  totalNumber: 50,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Daily Trips",
  totalNumber: 1697,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Clients Annually",
  totalNumber: "85k",
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Kilometers Daily",
  totalNumber: 2167,
  icon: "ri-timer-flash-line",
};
const CarHomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const[vehicleData, setVehicleData] = useState({});

  const getVehicleData = async () => {
    const docRef = doc(firestore, "ev", "at450x");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setVehicleData(docSnap.data());

    }
  }

  useEffect(() => {
    getVehicleData();
    
  },[])
  return (
  <>
    <div className="bg-white hero flex flex-col">
        <div className="navbar bg-transparent">
          <div className="flex-1 z-1000 ">
            <a href="#" className="btn btn-ghost text-4xl font-['penna'] text-white">
              EVWAY
            </a>
          </div>
          <div className="flex-none">
            <button className="btn px-12 btn-neutral mr- rounded-full">
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <SignOutButton />
              </SignedIn>
            </button>
          </div>
        </div>
      <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

      </div>
    </div>
    <div className='box__02_wrapper'>
      <div className="box__02">
                    <CircularProgressbar
                      value={vehicleData.battery}
                      text={vehicleData.battery}
                      styles={buildStyles({
                        pathColor: "#01d293",
                        textColor: "#01d293",
                        trailColor: "#0b0c28",
                        textSize: "18px",
                        zIndex: "1000",
                      })}
                    />
        </div>
    
    
    
      <div className="mt-10 flex flex-col items-center">
      
        <div className="hero-content flex-col items-center lg:flex-row mx-16">
          <div className="mx-8 flex flex-col items-center gap-3">
            <h1 className="text-5xl font-bold text-white">Welcome back {user.firstName}</h1>
            <p className="py-6 font-serif text-5xl  max-w-2xl text-center text-white">
              Make traveling easy and enjoyable by using our services.
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={
                  user
                    ? () => {
                        window.location.href =
                          "https://65d48357fe477cbd8289b506--stellar-flan-1e2dae.netlify.app/";
                      }
                    : () => {
                        window.location.href = "/login";
                      }
                }
                className="btn bg-blue-200 mx-2 text-1xl w-1/2"
              >
                Find the Best Spots!
              </button>
              <button
                onClick={() => navigate("/source-path")}
                className="btn btn-neutral"
              >
                Start Planning
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default CarHomePage