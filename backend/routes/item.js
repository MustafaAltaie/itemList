import express from 'express';
import Item from '../models/schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const Items = await Item.find();
    res.json(Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, price } = req.body;
    const newItem = new Item({ title, content, price });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, content, price } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { title, content, price },
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/checkpassword', async (req, res) => {
  try {
    res.json({ result: req.body.password === process.env.PASSWORD });
  } catch (err) {
    console.error("Error checking password:", err);
    res.status(500).json({ message: `Server error: ${err.message}` });
  }
});

export default router;