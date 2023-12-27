const mongoose = require('mongoose');

const databaseName = 'booksapi';
const username = 'ariqislam';
const password = 'ariqislam';

const mongoConnectionUrl = `mongodb+srv://${username}:${password}@ariq-test.531jm1s.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongoose.connect(mongoConnectionUrl);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

module.exports = connectDB;
