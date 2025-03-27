import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

const Item = mongoose.model('items', itemSchema);

export default Item;