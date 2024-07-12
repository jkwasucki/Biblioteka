import React, { useState } from 'react';
import Books from '@/Components/Books';
import { connectMongo } from '@/Lib/connectMongo';
import AddBookModal from '@/Components/AddBookModal';
export default function Main() {

  connectMongo();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main className="w-screen h-screen flex flex-col items-start justify-start p-12">
    <div className='mb-8'>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Add Book
      </button>
      <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
    <Books />
    </main>
  )
}
