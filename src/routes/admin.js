const express = require('express');
const router = express.Router();
const User = require('../models/User');
const CustomerProfile = require('../models/CustomerProfile');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get all customers with their profiles
router.get('/customers', async (req, res) => {
  try {
    const customers = await User.find({ role: 'customer' }).select('-password');
    const customersWithProfiles = await Promise.all(
      customers.map(async (customer) => {
        const profile = await CustomerProfile.findOne({ user: customer._id });
        return {
          ...customer.toObject(),
          profile
        };
      })
    );
    res.json(customersWithProfiles);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching customers' });
  }
});

// Get all agents
router.get('/agents', async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching agents' });
  }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    let profile = null;
    if (user.role === 'customer') {
      profile = await CustomerProfile.findOne({ user: user._id });
    }
    
    res.json({
      user,
      profile
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

module.exports = router; 