import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../assets/Ani.json";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const TripDetails = () => {
  const { user } = useUser();
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const interests = location?.state?.interests || [];

  if (!user) return;

  const saveUserToDb = async () => {
    if (interests.length === 0 || gender === "" || !user) {
      return toast.error("Please fill all the fields");
    }

    navigate("/source-path");

    try {
      const response = await axios.post("http://localhost:8800/user/new", {
        email: user.primaryEmailAddress,
        name: user.fullName,
        imageUrl: user?.profileImageUrl,
        clerkId: user.id,
        interests: interests,
        gender,
      });
    } catch (err) {
      console.log(err);
    }
  };

  console.log("interests", interests);
  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Toaster />
      <Navbar />
      <div className=" w-[80%] flex justify-center items-center gap-44 container mx-auto">
        <Lottie
          options={defaultOptions}
          height={500}
          width={500}
          className="left-container bg-y"
        />
        <div
          className="right-container w-[60%]
           p-8
          flex flex-col justify-center items-start
    "
        >
          <h1 className="text-4xl font-bold my-8 pb-4 ">Welcome to GoTrips</h1>
          <div className="">
            <p className="text-xl my-4">What's your budget?</p>
            <div className="flex flex-wrap">
              <input
                required
                type="number"
                placeholder="10,000"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          <div className="second mt-8">
            <p className="text-xl my-4">What your gender?</p>
            <div className="flex flex-wrap">
              <button
                onClick={() => {
                  setGender("male");
                }}
                className={`btn btn-outline m-2 ${
                  gender === "male" ? "btn-active" : ""
                }`}
              >
                Male
              </button>
              <button
                onClick={() => {
                  setGender("famale");
                }}
                className={`btn btn-outline m-2 ${
                  gender === "female" ? "btn-active" : ""
                }`}
              >
                Female
              </button>
              <button
                onClick={() => {
                  setGender("not-to-say");
                }}
                className={`btn btn-outline m-2 ${
                  gender === "not-to-say" ? "btn-active" : ""
                }`}
              >
                Not to say
              </button>
            </div>

            <button
              type="submit"
              onClick={saveUserToDb}
              className="mt-12 
            btn bg-black text-white
            w-[60%]  my-8"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
