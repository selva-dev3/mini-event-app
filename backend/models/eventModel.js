import mongoose from "mongoose";


const eventModel = new mongoose.Schema({
    name: {type: String, required: true,},
    date: {type: Date, required: true},
    location: {type: String, required: true},
    bannerUrl: {type: String, required: true},
    organizationName: {type: String, required: true},
    description: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    createtdBy: {type: String,ref:'User', required: true}

});

const Event = mongoose.model("Event", eventModel);

export default Event;