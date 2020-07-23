/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const { Reader, Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync());

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'A Brief History Of Time',
          author: 'Stephen Hawking',
          genre: 'Science',
          isbn: 1,
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });
        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('A Brief History Of Time');
        expect(newBookRecord.title).to.equal('A Brief History Of Time');
        expect(newBookRecord.author).to.equal('Stephen Hawking');
        expect(newBookRecord.genre).to.equal('Science');
        expect(newBookRecord.isbn).to.equal(1);
      });
    });
  });

  describe('with records in the database', () => {
    let books;

    beforeEach(async () => {
      await Book.destroy({ where: {} });

      books = await Promise.all([
        Book.create({
          title: 'First Book',
          author: 'The First Author',
          genre: 'Science',
          isbn: 2,
        }),
        Book.create({
          title: 'Second Book',
          author: 'The Second Author',
          genre: 'Adventure',
          isbn: 3,
        }),
        Book.create({
          title: 'A Third Book',
          author: 'The Third Author',
          genre: 'Cooking',
          isbn: 4,
        }),
      ]);
    });

    describe('GET /books', () => {
      it('gets all book records', async () => {
        const response = await request(app).get('/books');
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.isbn).to.equal(expected.isbn);
        });
      });
    });

    describe('GET /books/:id', () => {
      it('gets a book by its id', async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.isbn).to.equal(book.isbn);
      });

      it('gives a 404 if there is no book', async () => {
        const response = await request(app).get(`/books/12345`);

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('This Book could not be found.');
      });
    });

    describe('/PATCH /books:id', () => {
      it('updates Books genre by id', async () => {
        const book = books[0];
        const response = await request(app).patch(`/books/${book.id}`).send({
          genre: 'Fantasy',
        });
        const updatedBookRecord = await Book.findByPk(book.id, { raw: true });
        expect(response.status).to.equal(200);
        expect(updatedBookRecord.genre).to.equal('Fantasy');
      });

      it('gives a 404 if there is no book', async () => {
        const response = await request(app).patch(`/books/12345`).send({
          genre: 'Fantasy',
        });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('This Book could not be found.');
      });
    });

    describe('DELETE /books/:id', () => {
      it('deletes a book record by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);

        const deletedBookRecord = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBookRecord).to.equal(null);
      });

      it('returns a 404 if there is no book', async () => {
        const response = await request(app).delete('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('This Book could not be found.');
      });
    });
  });
});
