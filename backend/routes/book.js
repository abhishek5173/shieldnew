const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const BOOKS = path.join(__dirname, '../data/books.json');

router.get('/books', (req, res) => {
    const books = JSON.parse(fs.readFileSync(BOOKS, 'utf8'));
    res.json(books);
});

router.post("/books", (req, res) => {
    try {
        const books = JSON.parse(fs.readFileSync(BOOKS, 'utf8'));
        const { title, author, genre, location, contact, ownerid } = req.body;
        const newbook = {
            id: Date.now(),
            title,
            author,
            genre,
            location,
            location, ownerid, contact
        }
        books.push(newbook);
        fs.writeFileSync(BOOKS, JSON.stringify(books, null, 2), 'utf8');
        res.status(201).json(newbook);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book', error: error.message });
    }
})




router.delete('/books/:id', (req, res) => {
    try {
      const books = JSON.parse(fs.readFileSync(BOOKS, 'utf8'));
      const { id } = req.params;
      const bookIndex = books.findIndex((book) => book.id === parseInt(id));
  
      if (bookIndex === -1) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      books.splice(bookIndex, 1);
      fs.writeFileSync(BOOKS, JSON.stringify(books, null, 2), 'utf8');
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting book', error: error.message });
    }
  });

module.exports = router;