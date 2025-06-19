const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../lib/auth');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, role, ...profile } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const result = await signUp({ email, password, role, ...profile });
    if (result.error) {
      return res.status(400).json({ message: result.error.message || 'Registration failed' });
    }
    res.json({ user: result.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const result = await signIn({ email, password });
    if (result.error) {
      return res.status(400).json({ message: result.error.message || 'Login failed' });
    }
    res.json({ session: result.data.session, user: result.data.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 