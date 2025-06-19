const mongoose = require('mongoose');
const User = require('../models/User');
const CustomerProfile = require('../models/CustomerProfile');
require('dotenv').config();

const createTestData = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/customer_agent_app';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected successfully!');

    // Check if test customer exists
    let customer = await User.findOne({ email: 'customer@test.com' });
    
    if (!customer) {
      // Create a test customer
      customer = new User({
        username: 'test_customer',
        email: 'customer@test.com',
        password: 'Test123!@#',
        role: 'customer'
      });

      await customer.save();
      console.log('Test customer created:', customer);

      // Create customer profile
      const customerProfile = new CustomerProfile({
        user: customer._id,
        firstName: 'Test',
        lastName: 'Customer',
        phoneNumber: '1234567890'
      });

      await customerProfile.save();
      console.log('Customer profile created:', customerProfile);
    } else {
      console.log('Test customer already exists:', customer);
    }

    // Check if test agent exists
    let agent = await User.findOne({ email: 'agent@test.com' });
    
    if (!agent) {
      // Create a test agent
      agent = new User({
        username: 'test_agent',
        email: 'agent@test.com',
        password: 'Test123!@#',
        role: 'agent'
      });

      await agent.save();
      console.log('Test agent created:', agent);
    } else {
      console.log('Test agent already exists:', agent);
    }

    console.log('\nTest data setup completed successfully!');
    console.log('\nYou can log in with either:');
    console.log('Customer - Email: customer@test.com, Password: Test123!@#');
    console.log('Agent - Email: agent@test.com, Password: Test123!@#');

  } catch (error) {
    console.error('Error creating test data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
};

// Execute the function
createTestData(); 