const validateRegistration = (req, res, next) => {
  const { username, email, password, role, firstName, lastName, phoneNumber } = req.body;

  const errors = [];

  // Username validation
  if (!username) {
    errors.push('Username is required');
  } else {
    if (username.length < 3 || username.length > 30) {
      errors.push('Username must be between 3 and 30 characters');
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.push('Username can only contain letters, numbers, and underscores');
    }
  }

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email address');
    }
    if (email.length > 100) {
      errors.push('Email address is too long');
    }
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (password.length > 128) {
      errors.push('Password is too long');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }
  }

  // Role validation
  if (!role) {
    errors.push('Role is required');
  } else if (!['customer', 'agent'].includes(role)) {
    errors.push('Role must be either customer or agent');
  }

  // Customer-specific validations
  if (role === 'customer') {
    if (!firstName) {
      errors.push('First name is required for customers');
    } else if (firstName.length < 2 || firstName.length > 50) {
      errors.push('First name must be between 2 and 50 characters');
    }

    if (!lastName) {
      errors.push('Last name is required for customers');
    } else if (lastName.length < 2 || lastName.length > 50) {
      errors.push('Last name must be between 2 and 50 characters');
    }

    if (phoneNumber) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(phoneNumber)) {
        errors.push('Please provide a valid phone number');
      }
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email address');
    }
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin
}; 