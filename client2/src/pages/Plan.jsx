import React from "react";
import PolyLineComponent from "../components/Polyline";
import { useLocation } from "react-router-dom";

const Plan = () => {
  const location = useLocation();

  console.log("location", location.state);

  return (
    <div className="flex gap-8">
      <div
        className="text-2xl font-bold my-8 pb-4 w-[400px] mx-4
      flex flex-col items-start
      "
      >
        <h1>Your Personalized plan is ready</h1>
        <ul
          className="timeline w-[300px] timeline-vertical mt-4
        flex flex-col items-start ml-12
        
        "
        >
          {/* {arr.map((data, i) => {
            return (
              <li className="">
                <div className="timeline-start timeline-box text-lg">
                  {Number(data.data[0].distance).toFixed(2)} km
                </div>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="timeline-end timeline-box text-lg">
                  {data.data[0].name}
                </div>
                <hr />
              </li>
            );
          })} */}
        </ul>
      </div>
      <div className=" w-[50%]">
        <PolyLineComponent
          polyPoints={location.state.res}
          arr={location.state.cordinates}
        />
      </div>
    </div>
  );
};

export default Plan;
