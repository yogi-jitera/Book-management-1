// src/pages/api/books/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';

// Dummy in-memory data store (replace with DB access layer)
let books: { id: string; [key: string]: any }[] = []; // Replace with proper DB/model in implementation

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Validate book id extraction
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing book ID.' });
  }

  // PATCH / Update Book
  if (req.method === 'PATCH') {
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Update only fields provided in body
    const updates = req.body;
    books[index] = { ...books[index], ...updates };

    return res.status(200).json({ message: 'Book updated successfully.', data: books[index] });
  }

  // DELETE Book (existing functionality)
  if (req.method === 'DELETE') {
    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      // Book not found
      return res.status(404).json({ message: 'Book not found.' });
    }

    // Delete the book
    books.splice(index, 1);

    // Success response
    return res.status(200).json({ message: 'Book deleted successfully.' });
  }

  // Return 405 for unsupported methods
  res.setHeader('Allow', ['DELETE', 'PATCH']);
  return res.status(405).json({ message: 'Method Not Allowed' });
}