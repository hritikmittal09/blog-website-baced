import User from "../models/user.js"; // Assuming User model is in models/user.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secretKey = process.env.secretKey;

// Register Controller
export const registerController = async (req, res) => {
    console.log("working....");
    
    const body = req.body;

    if (!body.name || !body.email || !body.password) {
        return res.status(401).json({
            message: "Bad request"
        });
    }

    try {
        // Check if user already exists by email
        const userExist = await User.findOne({ email: body.email });

        if (!userExist) {
            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(body.password, 10);

            // Create a new user
            const newUser = new User({
                name: body.name,
                email: body.email,
                password: hashedPassword
            });

            await newUser.save(); // Save the new user in the database

            res.status(201).json({
                message: "User created"
            });
        } else {
            res.status(401).json({
                message: "User already exists"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    console.log(secretKey);

    const { email, name, password: enteredPassword } = req.body;

    if (!name || !email || !enteredPassword) {
        return res.status(401).json({
            message: "Bad request"
        });
    }

    try {
        // Find user by email
        const userExist = await User.findOne({ email: email });

        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        }

        // Compare entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(enteredPassword, userExist.password);

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password incorrect!"
            });
        }

        // Prepare JWT payload
        const payload = { email, name, userId: userExist._id };
        const userInfo = { email: userExist.email, name: userExist.name, userId: userExist._id };

        // Sign JWT
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.status(200).json({
            success: true,
            user: userInfo,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong"
        });
    }
};

// Middleware for login check
export const loginCheck = (req, res, next) => {
    let token = req.get("auth");

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        // Verify token
        const decodedToken = jwt.verify(token, secretKey);

        if (decodedToken) {
            next(); // Continue to the next middleware or controller
        } else {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Token expired"
        });
    }
};
