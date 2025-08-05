require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Use a single, flexible CORS setup. This is best for deployment.
app.use(cors());

// This middleware is for parsing JSON bodies
app.use(express.json());

// Health Check Route for Render
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
    process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Atlas connected successfully.'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// --- API Routes ---
app.use('/api/applicants', require('./routes/applicants'));


// --- Start Server ---
const PORT = process.env.PORT || 5000;

// Use the more robust app.listen with the host specified
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
