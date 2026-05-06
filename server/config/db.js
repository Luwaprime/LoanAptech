const dns = require('dns');
const mongoose = require('mongoose');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable');
  }

  // Work around Windows/Node SRV DNS resolver issues by using public DNS servers.
  dns.setServers(['1.1.1.1', '8.8.8.8']);

  while (true) {
    try {
      await mongoose.connect(uri);
      console.log('✅ MongoDB connected');
      break;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message || error);
      console.log('Retrying MongoDB connection in 5 seconds...');
      await wait(5000);
    }
  }
};

module.exports = connectDB;