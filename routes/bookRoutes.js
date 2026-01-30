const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.post('/books', bookController.createBook);
router.get('/books', bookController.getAllBooks);
router.get('/books/search', bookController.searchBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
// PATCH for single book (existing)
router.patch('/books/:id', bookController.patchBook);

// PATCH for multiple books by user (new)
router.patch('/books/:user', bookController.patchBooksByUser);

router.delete('/books/:id', bookController.deleteBook);

module.exports = router;