import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Book = mongoose.models.Book || mongoose.model('Book', BookSchema);

export default Book;