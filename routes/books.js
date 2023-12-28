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

  bookRouter.use('/books/:bookId', async (req, res, next) => {
    const { bookId } = req.params;
    try {
      const book = await Book.findById(bookId);
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    } catch (err) {
      return res.status(404).send(err);
    }
  });

  bookRouter.route('/books/:bookId')
    .get(async (req, res) => res.json(req.book))
    .put(async (req, res) => {
      try {
        const { book } = req;
        const {
          title, author, publication_year, genre, isbn, read,
        } = req.body;
        Object.assign(book, {
          title, author, publication_year, genre, isbn, read,
        });
        await book.save();
        return res.json(book);
      } catch (err) {
        return res.send(err);
      }
    })
    .patch(async (req, res) => {
      try {
        const { book } = req;
        const { _id, ...rest } = req.body;
        Object.entries(rest).forEach((item) => {
          const key = item[0];
          // eslint-disable-next-line prefer-destructuring
          book[key] = item[1];
        });
        await book.save();
        return res.json(book);
      } catch (err) {
        return res.send(err);
      }
    })
    .delete(async (req, res) => {
      try {
        const { book } = req;
        await book.deleteOne();
        return res.sendStatus(204);
      } catch (err) {
        console.log(err);
        return res.send(err);
      }
    });

  return bookRouter;
};

module.exports = router;
