
import mongoose from 'mongoose';

const RentalSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  rent_date: {
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
  },
  user_id: {
    type: Number,
    required: true,
  },
  book_id: {
    type: Number,
    required: true,
  },
});

const Rental = mongoose.models.Rental || mongoose.model('Rental', RentalSchema);

export default Rental;