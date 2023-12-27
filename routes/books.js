const express = require('express');

const { queryParams } = require('../utls/query-helper');

const router = (Book) => {
  const bookRouter = express.Router();
  bookRouter.route('/books').get(async (req, res) => {
    const { query } = req;
    const allowedQueries = ['genre', 'author', 'title', 'read'];
    const reqQuery = queryParams(allowedQueries, query);

    try {
      const books = await Book.find(reqQuery);
      return res.json(books);
    } catch (err) {
      return res.send(err);
    }
  });

  bookRouter.route('/books').post(async (req, res) => {
    const { body } = req;
    try {
      const book = new Book(body);
      await book.save();
      return res.status(201).json(book);
    } catch (err) {
      return res.send(err);
    }
  });

  bookRouter.route('/books/:bookId').get(async (req, res) => {
    try {
      const book = await Book.findById(req.params.bookId);
      return res.json(book);
    } catch (err) {
      return res.send(err);
    }
  });

  return bookRouter;
};

module.exports = router;
