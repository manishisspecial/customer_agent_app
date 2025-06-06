import connectDB from './mongodb';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { verifyToken } from './auth';

export const createConversation = async (userId, title) => {
  try {
    await connectDB();
    
    const conversation = new Conversation({
      user_id: userId,
      title
    });

    const data = await conversation.save();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getConversations = async (userId) => {
  try {
    await connectDB();
    
    const data = await Conversation.find({ user_id: userId })
      .sort({ created_at: -1 });
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createMessage = async (conversationId, userId, content) => {
  try {
    await connectDB();
    
    const message = new Message({
      conversation_id: conversationId,
      user_id: userId,
      content
    });

    const data = await message.save();
    
    // Update conversation's updated_at
    await Conversation.findByIdAndUpdate(conversationId, {
      updated_at: new Date()
    });

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getMessages = async (conversationId) => {
  try {
    await connectDB();
    
    const data = await Message.find({ conversation_id: conversationId })
      .sort({ created_at: 1 });
    
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const deleteConversation = async (conversationId) => {
  try {
    await connectDB();
    
    // Delete all messages in the conversation
    await Message.deleteMany({ conversation_id: conversationId });
    
    // Delete the conversation
    await Conversation.findByIdAndDelete(conversationId);
    
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const verifyDatabaseConnection = async () => {
  try {
    await connectDB();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}; 