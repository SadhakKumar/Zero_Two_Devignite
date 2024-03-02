import React, { useState } from "react";

import MapPicker from "react-google-map-picker";
import RefreshIcon from "../../icons/RefreshIcon";

const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

const LocationPicker = ({ setCoordinates }) => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
    setCoordinates({ lat: lat, lon: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  return (
    <div
      className="w-[40%] h-[80%] flex flex-col mx-4
    gap-4 
    "
    >
      {/* <div className="flex items-center justify-between gap-8 ">
        <button
          className="btn btn-outline bg-white text-black"
          onClick={handleResetLocation}
        >
          <RefreshIcon />
          Reset Location
        </button>
        <div className="lat flex items-center gap-2">
          <label className="font-bold">Latitute:</label>
          <input
            type="text"
            className="input input-bordered"
            value={location.lat}
          />
        </div>
        <div className="lat flex items-center gap-2">
          <label className="font-bold">Longitute:</label>
          <input
            type="text"
            className="input input-bordered"
            value={location.lng}
          />
        </div>
      </div> */}

      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
      />
    </div>
  );
};

export default LocationPicker;
