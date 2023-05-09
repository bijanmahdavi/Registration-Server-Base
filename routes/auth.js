const express = require('express');
const { registerUser, loginUser } = require('../services/authService');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, phone_number, password } = req.body;

  try {
    const result = await registerUser(username, email, phone_number, password);
    res.status(200).json({ message: 'User registered', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const result = await loginUser(identifier, password);
    res.status(200).json({ message: 'User logged in', data: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
