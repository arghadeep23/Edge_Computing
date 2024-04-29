// server.js
const express = require('express');

// Create an Express application
const app = express();
const cors = require('cors');
// Middleware to parse JSON bodies
app.use(express.json());
// Example configuring specific origins
const corsOptions = {
    origin: '*', // Allow requests from this origin
    methods: 'GET,POST', // Allow only specified HTTP methods
    optionsSuccessStatus: 200 // Return 200 for preflight requests
};

app.use(cors(corsOptions));
// Define a route to handle webhook requests
app.post('/webhook', (req, res) => {
    // Extract data from the webhook request
    const { event, data } = req.body;

    // Process the webhook data
    console.log('Received webhook event:', event);
    console.log('Webhook data:', data);

    // Respond to the webhook request
    res.status(200).send('Webhook received successfully');
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
