import ChargingStation from '../model/modelStation.js';

const getStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find({ "state": "Maharashtra"});

    res.status(200).json(stations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export{
  getStations
}