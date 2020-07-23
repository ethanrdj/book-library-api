const { Book } = require('../models');

const getAllBooks = (req, res) => {
  Book.findAll().then((allBooks) => {
    res.status(200).json(allBooks);
  });
};

const createBookEntry = (req, res) => {
  const bookDetails = req.body;

  Book.create(bookDetails).then((newBook) => {
    res.status(201).json(newBook);
  });
};

const getBookById = (req, res) => {
  const bookId = req.params.id;
  Book.findByPk(bookId).then((book) => {
    if (!book) {
      res.status(404).json({ error: 'This Book could not be found.' });
    } else {
      res.status(200).json(book);
    }
  });
};

const updateBookById = (req, res) => {
  const { id } = req.params;
  const updateDetails = req.body;

  Book.update(updateDetails, { where: { id } }).then(([updatedBook]) => {
    if (!updatedBook) {
      res.status(404).json({ error: 'This Book could not be found.' });
    } else {
      res.status(200).json(updatedBook);
    }
  });
};

const deleteBookById = (req, res) => {
  const { id } = req.params;

  Book.destroy({ where: { id: id } }).then((deletedBook) => {
    if (!deletedBook) {
      res.status(404).json({ error: 'This Book could not be found.' });
    } else {
      res.status(204).json(deletedBook);
    }
  });
};

module.exports = {
  getAllBooks,
  createBookEntry,
  getBookById,
  updateBookById,
  deleteBookById,
};
