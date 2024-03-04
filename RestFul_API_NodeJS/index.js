// server.js
const express = require('express');

// Create an Express application
const app = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
const map = new Map();
let messages = [];

// Define routes
app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    console.log('POST request count : ', messages.length + 1);
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const newMessage = { text };
    messages.push(newMessage);

    res.status(201).json(newMessage);
});
app.get('/details/user?/:id', (req, res) => {
    const id = req.params.id;
    const convertToNumber = parseInt(id, 10);
    if (!map.has(convertToNumber)) {
        return res.status(400).json({ error: 'User Id is invalid. User does not exist' });
    }
    if (map.has(convertToNumber)) {
        res.json(map.get(convertToNumber));
    }
    else {
        res.status(404).json({ error: 'User not found' });
    }
});
app.get("/details/all", (req, res) => {
    const valuesArray = [];
    for (const value of map.values()) {
        valuesArray.push(value);
    }
    res.json(valuesArray);
});
app.post('/details/user?/:id', (req, res) => {
    const id = req.params.id;
    const { details } = req.body;
    const convertToNumber = parseInt(id, 10);
    if (!details) {
        return res.status(400).json({ error: 'User details cannot be empty' });
    }
    if (map.has(convertToNumber)) {
        console.log('User already exists, so details updated');
    }
    else {
        console.log('User created');

    }
    map.set(convertToNumber, details);
    res.status(201).json(details);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
