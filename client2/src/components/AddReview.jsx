import { useEffect, useState } from "react";
import upload from "../utils/upload";
import { toast } from "react-hot-toast";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { TimePicker } from "antd";
import axios from "axios";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY/MM/DD";

const InputForm = ({ coordinates }) => {
  const { lat, lon } = coordinates;
  const [city, setCity] = useState("");
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formData, setFormData] = useState({
    eventName: "",
    description: "",
    enteryFees: "",
    organizer: "",
    contact: "",
  });

  const handleFile1 = async (e) => {
    e.preventDefault();

    const files = e.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      data.append("upload_preset", "fiverr");
      const url = await upload(data);
      setImageUrl([...imageUrl, url]);
      // console.log("url", profileImage);
    }
    toast.success("File Uploaded");
  };

  useEffect(() => {
    getLocationName(lat, lon);
  }, [coordinates]);

  const getLocationName = async (lat, lon) => {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    );

    const data = await response.json();
    setCity(data.city);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // make post req at http://localhost:8800/campaign/new
    const res = await axios.post("http://localhost:8800/campaign/new", {
      ...formData,
      images: imageUrl,
      coords: [lat, lon],
      venue: city,
      startDate: date[0],
      startTime: time[0],
      endDate: date[1],
      endTime: time[1],
    });

    console.log("res", res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-md  h-[80%] px-4 pb-4
      bg-base-200 shadow-lg 
    "
    >
      <div className="grid grid-cols-2 gap-x-1">
        <div className="flex flex-col">
          {/* // event name */}
          <div className="flex justify-center px-4 pt-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">What is the event called?</span>
              </div>
              <input
                type="text"
                placeholder="Event Name"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          {/* // artist */}
          <div className="flex justify-center px-4 pb-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Featured Artists</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="organizer"
                value={formData.organizer}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-center px-4 py-2">
          <label className="form-control">
            <div className="label">
              <span className="label-text">Event description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-36 w-80"
              placeholder="Event Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </label>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center px-4 pt-2">
            {/* // location */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Where is the event planned?</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                name="location"
                className="input input-bordered w-full max-w-xs"
                value={city}
              />
            </label>
          </div>
          {/* // price */}
          <div className="flex justify-center px-4 pb-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Price</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="enteryFees"
                value={formData.enteryFees}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-center px-4 pt-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Upload banner</span>
              </div>
              <input
                type="file"
                onChange={handleFile1}
                className=" file-input-primary 
              file-input w-full max-w-xs"
              />
            </label>
          </div>
          <div className="flex justify-center px-4 pb-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Contact number</span>
              </div>
              <input
                type="text"
                placeholder="phone number"
                className="input input-bordered w-full max-w-xs"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-center px-4 py-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Start date & End date</span>
            </div>
            <RangePicker
              onChange={(date, dateString) => {
                setDate(dateString);
              }}
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "#0a0800",
                cursor: "pointer",
                opacity: "0.3",
                border: "1px solid #fff",
              }}
              type="text"
              className="input w-full max-w-xs cursor-pointer 
              bg-black"
              defaultValue={[
                dayjs("2015/01/01", dateFormat),
                dayjs("2015/01/01", dateFormat),
              ]}
              format={dateFormat}
            />
          </label>
        </div>

        <div className="flex justify-center px-4 py-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Start & End time</span>
            </div>
            <TimePickerComponent setTime={setTime} />
          </label>
        </div>
      </div>
      <button
        className="btn w-full btn-primary mt-3 mx-4"
        onClick={handleSubmit}
      >
        RSVP or Book Now!
      </button>
    </form>
  );
};

const TimePickerComponent = ({ setTime }) => {
  const onChange = (time, timeString) => {
    console.log(timeString);
    setTime(timeString);
  };
  return (
    <TimePicker.RangePicker
      onChange={onChange}
      style={{
        width: "100%",
        color: "white",
        backgroundColor: "#0a0800",
        opacity: "0.3",
        textDecorationColor: "white",
        cursor: "pointer",
        border: "1px solid #fff",
      }}
      type="text"
      className="input w-full max-w-xs cursor-pointer
      text-white
      "
      defaultValue={[
        dayjs("00:00:00", "HH:mm:ss"),
        dayjs("00:00:00", "HH:mm:ss"),
      ]}
    />
  );
};

export default InputForm;
