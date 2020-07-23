const express = require('express');
const readerRouter = require('./routes/reader');
const bookRouter = require('./routes/book');

const app = express();

app.use(express.json());

// READER
app.use('/readers', readerRouter);

// BOOK

app.use('/books', bookRouter);

module.exports = app;
