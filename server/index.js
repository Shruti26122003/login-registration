const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const EmployeeModel = require('./models/Employess'); // Ensure the model name matches

const app = express();
app.use(express.json());
app.use(cors());

mongoose.set('debug', true); 
mongoose.connect("mongodb://127.0.0.1:27017/employees")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Connection error:", error));

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Received registration data:", req.body);

        const existingUser = await EmployeeModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new EmployeeModel({ name, email, password: hashedPassword });
        
        try {
            const savedUser = await newUser.save();
            console.log("User saved successfully:", savedUser);
            res.status(201).json(savedUser);
        } catch (saveError) {
            console.error("Error saving user:", saveError);
            res.status(500).json({ error: "Error saving user: " + saveError.message });
        }
    } catch (error) {
        console.error("Error in /register endpoint:", error);
        res.status(500).json({ error: "Error registering user: " + error.message });
    }
});

// Start server
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
