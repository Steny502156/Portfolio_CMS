const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const authMiddleware = require("./middleware/auth");

app.get("/users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Portfolio CMS Backend');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
