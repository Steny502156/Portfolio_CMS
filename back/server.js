import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "./middlewares/authMiddleware.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js"; // Import authRoutes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/users";

mongoose.connect(MONGO_URI) // Use MONGO_URI instead of process.env.MONGO_URI
.then(() => {
    console.log("Connected to MongoDB:", mongoose.connection.name);
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Move this line after defining the routes
// app.use('/api/auth', authRoutes);

// ✅ Register a New User
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser  = await User.findOne({ email });

        if (existingUser ) {
            return res.status(400).json({ error: "User  already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User  registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Login a User & Generate Token
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Fetch All Users (Protected Route)
app.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Remove this line as it's already defined above
// const PORT = process.env.PORT || 5000;

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});