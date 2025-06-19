const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const User = require('../models/User');

// Get all conversations for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { customer: req.params.userId },
        { agent: req.params.userId }
      ]
    })
    .populate('customer', 'firstName lastName email')
    .populate('agent', 'firstName lastName email')
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new conversation
router.post('/', async (req, res) => {
  try {
    const { customer, agent, subject } = req.body;

    // Verify users exist
    const [customerUser, agentUser] = await Promise.all([
      User.findById(customer),
      User.findById(agent)
    ]);

    if (!customerUser || !agentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const conversation = new Conversation({
      customer,
      agent,
      subject
    });

    await conversation.save();
    res.status(201).json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get conversation by ID
router.get('/:id', async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('customer', 'firstName lastName email')
      .populate('agent', 'firstName lastName email')
      .populate('lastMessage');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update conversation status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get messages for a conversation
router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.id })
      .populate('sender', 'firstName lastName email')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 