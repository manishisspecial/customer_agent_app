import jwt from 'jsonwebtoken';
import User from '../models/User';
import connectDB from './mongodb';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable');
}

export const signIn = async (email, password) => {
  try {
    await connectDB();
    
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        },
        token
      },
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const signUp = async (email, password, role) => {
  try {
    await connectDB();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user = new User({
      email,
      password,
      role
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return {
      data: {
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        },
        token
      },
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    // With JWT, we just need to remove the token from the client
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const getCurrentUser = async (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    await connectDB();
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      throw new Error('User not found');
    }

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      },
      error: null
    };
  } catch (error) {
    return { user: null, error };
  }
};

export const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return { decoded, error: null };
  } catch (error) {
    return { decoded: null, error };
  }
}; 