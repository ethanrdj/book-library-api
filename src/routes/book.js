const express = require('express');

const router = express.Router();
const bookController = require('../controllers/book');

router.route('/').get(bookController.getAllBooks);

router.route('/').post(bookController.createBookEntry);

router.route('/:id').get(bookController.getBookById);

router.route('/:id').patch(bookController.updateBookById);

router.route('/:id').delete(bookController.deleteBookById);

module.exports = router;
