import mongoose from 'mongoose';

// Define schema for your collection
const chargingStationSchema = new mongoose.Schema({
    name: String,
    state: String,
    city: String,
    address: String,
    latitude: Number,
    longitude: Number,
    type: Number
});

// Create a Mongoose model based on the schema
const ChargingStation = mongoose.model('stations', chargingStationSchema);

export default ChargingStation;
