import express from "express";
import cors from "cors";
import connectDB from "./service/databaseService.js"
import {getStations} from "./controllers/station.js"

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/stations",getStations);


app.listen(3000, () => {
  connectDB();
  console.log(`Server is running on port 3000`);
});