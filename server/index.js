require('dotenv').config();
// Server Entry Point - Updated for Mobile-First adjustments
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
const credentialRoutes = require('./routes/credentials');
app.use('/api/credentials', credentialRoutes);

app.get('/', (req, res) => {
    res.send('Credential Manager API Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
