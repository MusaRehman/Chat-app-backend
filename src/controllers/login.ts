

// sign up

import { RegisterAuthRequest } from "../interfaces/auth";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "dotenv";
// import { v4 as uuid } from "uuid";
import { User } from "../models/users";

const SALT_ROUNDS: number = 10;
env.config();

export const signUp = async (req: Request<{}, {}, RegisterAuthRequest>, res: Response) => {
    const { username, email, password } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // Check if the email already exists
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const hasedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            passwordHash: hasedPassword,
        });
        if (!newUser) {
            return res.status(500).json({ message: "Failed to create user" });
        }

        return res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error during sign up:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const passwordHash = user.passwordHash;
        const userId = user.id;
        const username = user.username;
        const userEmail = user.email;

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        // Generate JWT token
        const token = jwt.sign({userId, username, userEmail}, process.env.JWT_SECRET! ,{ expiresIn: "1d" })

        res.status(200).json({ message: "Login successful", token });
        
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
