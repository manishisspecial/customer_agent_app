const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Create new message
router.post('/', async (req, res) => {
  try {
    const { conversation, sender, content, attachments } = req.body;

    // Create message
    const message = new Message({
      conversation,
      sender,
      content,
      attachments
    });

    // Save message
    await message.save();

    // Update conversation's last message
    await Conversation.findByIdAndUpdate(conversation, {
      lastMessage: message._id,
      updatedAt: Date.now()
    });

    // Populate sender details
    await message.populate('sender', 'firstName lastName email');

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // If this was the last message in the conversation, update the conversation
    const conversation = await Conversation.findById(message.conversation);
    if (conversation && conversation.lastMessage.toString() === message._id.toString()) {
      const lastMessage = await Message.findOne({ conversation: message.conversation })
        .sort({ createdAt: -1 });
      
      await Conversation.findByIdAndUpdate(message.conversation, {
        lastMessage: lastMessage ? lastMessage._id : null
      });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 