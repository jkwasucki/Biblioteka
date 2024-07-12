import { connectMongo } from '../../../Lib/connectMongo';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body, 
  } = req;

  await connectMongo();

  switch (method) {
    case 'GET':
      try {
        const book = await Book.findById(id);
        if (!book) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
      } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Failed to fetch book' });
      }
      break;
    case 'PUT':
      try {
        if (body && body.availability !== undefined) {
          const updatedBook = await Book.findByIdAndUpdate(id, { availability: body.availability }, {
            new: true,
          });
          if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
          }
          res.status(200).json(updatedBook);
        } else {
          const updatedBook = await Book.findByIdAndUpdate(id, body, {
            new: true,
          });
          if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
          }
          res.status(200).json(updatedBook);
        }
      } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Failed to update book' });
      }
      break;
    case 'DELETE':
      try {
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
          return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
      } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Failed to delete book' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}