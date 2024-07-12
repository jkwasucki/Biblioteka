import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function AddBookModal({ isOpen, onClose, bookToEdit }) {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    ISBN: '',
  });

  useEffect(() => {
    if (bookToEdit) {
      setBookData({
        title: bookToEdit.title,
        author: bookToEdit.author,
        ISBN: bookToEdit.ISBN,
      });
    } else {
      setBookData({
        title: '',
        author: '',
        ISBN: '',
      });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (bookToEdit) {
        await axios.put(`/api/books/${bookToEdit._id}`, bookData);
        console.log('Book updated successfully');
      } else {
        await axios.post('/api/books', bookData);
        console.log('Book added successfully');
      }
      onClose(); 
    } catch (error) {
      console.error('Error adding/updating book:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/books/${bookToEdit._id}`);
      console.log('Book deleted successfully');
      onClose(); 
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{bookToEdit ? 'Edit Book' : 'Add Book'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="text-black border mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="text-black border mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">ISBN</label>
            <input
              type="text"
              name="ISBN"
              value={bookData.ISBN}
              onChange={handleChange}
              className="text-black border mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            {bookToEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="mr-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md"
            >
              {bookToEdit ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
