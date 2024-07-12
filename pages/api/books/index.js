import { connectMongo } from '../../../Lib/connectMongo';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  await connectMongo();

  switch (req.method) {
    case 'GET':
      try {
        const books = await Book.find({});
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
      }
      break;
    case 'POST':
      try {
        const { title, author, ISBN, availability } = req.body;
        const newBook = new Book({ title, author, ISBN, availability });
        await newBook.save();
        res.status(201).json(newBook);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add book' });
      }
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}