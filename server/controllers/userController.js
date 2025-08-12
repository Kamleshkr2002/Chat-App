import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


//signup new user
export const  signup = async (req, res) => {
    const { email, fullName, password ,bio} = req.body;

    try{
        if (!email || !fullName || !password || !bio) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // password
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await User.create({ email, fullName, password: hashedPassword, bio });

        const token = generateToken(newUser._id);


        return res.status(201).json({ success: true, message: "User created successfully", data: newUser, token });



    }catch (error) {
        console.error("Error during user signup:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//controller to login user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = generateToken(user._id);

        return res.status(200).json({ success: true, message: "Login successful", data: user, token });

    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//controller to check if user is authenticated
export const checkAuth = async (req, res) => {
    res.status(200).json({ success: true, message: "User is authenticated", user: req.user });
}

//controller to update user profile
export const updateProfile = async (req, res) => {
    
    try {
        const {profilePic, fullName, bio } = req.body;
        const userId = req.user._id;
        let updatedUser
        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio }, { new: true });
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userId, { fullName, bio ,profilePic: upload.secure_url}, { new: true });
        }

        return res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}