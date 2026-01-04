import User from "../models/usersModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import validator from 'validator';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }
        const user = await User.find({ email });
        if (!user[0]) {
            return res.json({ success: false, message: "User Doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user[0]._id);
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Login Faild" })
    }
}

// create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;


    try {
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }
        const exists = await User.find({ email });
        if (exists[0]) {

            return res.json({ success: false, message: "User already exists" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, Email: email, message: "Please enter valid email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter strong password" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        })


        const user = await newUser.save();
        if(!user){
            return res.json({ success: false, message: "User Not Register" })
        }
        const token = createToken(user._id);
    
        res.json({ success: true, token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "User Not Register" })
    }
}







export { loginUser, registerUser }