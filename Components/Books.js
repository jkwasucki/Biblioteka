import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookModal from './AddBookModal';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
    setIsEditing(false);
  };

  const handleReserve = async (bookId, currentAvailability) => {
    try {
      const response = await axios.put(`/api/books/${bookId}`, {
        availability: !currentAvailability 
      });

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId ? { ...book, availability: !currentAvailability } : book
        )
      );
    } catch (error) {
      console.error('Error reserving book:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book._id} className="border p-4 rounded-md">
              <p className="text-lg font-semibold">{book.title}</p>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">ISBN: {book.ISBN}</p>
              <p className='text-white'>{book.availability ? "Available" : "Unavailable"}</p>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                {book.availability ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleReserve(book._id, book.availability)}
                  >
                    Reserve
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleReserve(book._id, book.availability)}
                  >
                    Revoke Reservation
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {isEditing && (
        <AddBookModal isOpen={true} onClose={handleCancelEdit} bookToEdit={selectedBook} />
      )}
    </div>
  );
}
