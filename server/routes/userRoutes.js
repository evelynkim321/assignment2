const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model

// POST route to add a new user
router.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET route to get a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT route to update a user by ID
router.put('/users/:id', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE route to remove a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE route to remove all users
router.delete('/users', async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).send('All users deleted successfully');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
