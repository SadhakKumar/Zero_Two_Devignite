import React from "react";
import PolyLineComponent from "../components/Polyline";
import { useLocation } from "react-router-dom";

const Plan = () => {
  const location = useLocation();

  console.log("location", location.state);

  return (
    <div className="flex flex-col gap-3">
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
          className=" 
    
            btn bg-black text-white
            md:w-[14%]  md:mr-8"
        >
          Back To Home
        </button>
      </div>

      <div className="w-[98%] mx-auto">
        <PolyLineComponent
          polyPoints={[...location.state.res]}
          arr={location.state.cordinates}
        />
      </div>
    </div>
  );
};

export default Plan;
