const mongoose = require('mongoose');

const { Schema } = mongoose;
const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  publication_year: { type: Number },
  genre: { type: String },
  isbn: { type: String },
  read: { type: Boolean, default: false },
}, { versionKey: false });

module.exports = mongoose.model('Book', bookModel);
