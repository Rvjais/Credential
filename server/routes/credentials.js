const express = require('express');
const router = express.Router();
const Credential = require('../models/Credential');

// @route   GET /api/credentials
// @desc    Get all credentials
router.get('/', async (req, res) => {
    try {
        const credentials = await Credential.find().sort({ createdAt: -1 });
        res.json(credentials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/credentials
// @desc    Add a new credential
router.post('/', async (req, res) => {
    const { platformName, username, password, department, description } = req.body;

    const newCredential = new Credential({
        platformName,
        username,
        password,
        department,
        description
    });

    try {
        const savedCredential = await newCredential.save();
        res.status(201).json(savedCredential);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   PUT /api/credentials/:id
// @desc    Update a credential
router.put('/:id', async (req, res) => {
    try {
        const updatedCredential = await Credential.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedCredential);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   DELETE /api/credentials/:id
// @desc    Delete a credential
router.delete('/:id', async (req, res) => {
    try {
        await Credential.findByIdAndDelete(req.params.id);
        res.json({ message: 'Credential deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
