import mongoose from "mongoose";

const usersModel = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    token: {type: String}

});

const User = mongoose.model("User", usersModel);

export default User;