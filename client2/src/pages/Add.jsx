import InputForm from "../components/AddReview";
import { Toaster } from "react-hot-toast";
import LocationPicker from "../components/map/LocationPicker";
import { useState } from "react";

function Add() {
  const [coordinates, setCoordinates] = useState({
    lat: 10,
    lon: 20,
  });
  return (
    <div
      className="flex flex-col h-screen w-[96%] mx-auto px-12 pt-8 overflow-y-hidden
    "
    >
      <Toaster />
      <div className="text-center text-3xl font-bold font-mono">
        <h1 className="">Enter Event Details</h1>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <InputForm coordinates={coordinates} />
        <LocationPicker setCoordinates={setCoordinates} />
      </div>
    </div>
  );
}

export default Add;
