import React, { useEffect, useState } from "react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { firestore, doc, getDoc } from "../firebase";
import SingleCard from "../components/SingleCard";
import "./CarHomePage.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CarItem from "../components/CarItem";
import MileChart from "../components/Barchart";
import { getNearestStation } from "../utils/nearestStation";

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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (user) {
      setMounted(true);
    }
  }, [user]);

  const [vehicleData, setVehicleData] = useState({});

  const getVehicleData = async () => {
    const docRef = doc(firestore, "ev", "at450x");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setVehicleData(docSnap.data());
    }
  };

  useEffect(() => {
    getVehicleData();
    getNearestStation(18.5204, 73.8567, 10);
  }, []);

  if (!mounted) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg-white hero flex flex-col">
        <div className="navbar bg-transparent">
          <div className="flex-1 z-1000 ">
            <a
              href="#"
              className="btn btn-ghost text-4xl font-['penna'] text-white"
            >
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
          <h1 className="text-3xl font-bold text-white mb-4">Dashboard</h1>
          <div className="dashboard__wrapper">
            <div className="dashboard__cards">
              <SingleCard item={carObj} />
              <SingleCard item={tripObj} />
              <SingleCard item={clientObj} />
              <SingleCard item={distanceObj} />
            </div>
          </div>
        </div>
        <div className="box__02_wrapper">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-white font-bold text-2xl">Battery Status</h2>
            <div className="box__02 relative">
              <CircularProgressbar
                value={vehicleData.battery}
                styles={buildStyles({
                  pathColor: "#01d293",
                  textColor: "trailColor",
                  trailColor: "#0b0c28",
                  textSize: "18px",
                  zIndex: "1000",
                  borderRadius: "25px",
                  pathTransitionDuration: 0.5,
                })}
              />
              <p
                className="
         absolute top-1/2 left-1/2 transform -translate-x-1/3 -translate-y-[24px]
         text-white mt-3 font-bold text-2xl"
              >
                {vehicleData.battery} %
              </p>
            </div>
          </div>

          <CarItem />

          <div className=" w-[40%] flex flex-col items-start justify-center text-start ml-20 ">
            <div className="hero-content flex-col items-start lg:flex-row mx-16">
              <div className="mx-8 flex flex-col items-start gap-3">
                <h1 className="text-5xl font-bold text-white">
                  Welcome back {user.firstName}
                </h1>
                <p
                  className="py-6 font-serif text-xl  max-w-2xl text-start
             text-slate-500"
                >
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
};

export default CarHomePage;
