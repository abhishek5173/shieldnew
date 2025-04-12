const express = require('express');
const router = express.Router();
const fs = require('fs');

const path = require('path');

const USER = path.join(__dirname, '../data/users.json');

router.post("/signup", (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(USER, 'utf8'));
        const { name, email, password, role, mobile } = req.body;
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newuser = { id: Date.now(), name, email, password, role, mobile };
        users.push(newuser);
        fs.writeFileSync(USER, JSON.stringify(users), 'utf8');
        res.status(201).json({ message: "User created successfully", user: newuser });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
})

router.post("/login", (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(USER, 'utf8'));
        const { email, password } = req.body;
        const user = users.find(user => user.email === email && user.password === password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
})






module.exports = router;