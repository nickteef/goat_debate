// GameHighs routes
import express from 'express';
import GameHighs from '../models/GameHighs.js';

const gameHighsRoutes = express.Router();

// Get all game highs
gameHighsRoutes.get('/', async (req, res) => {
  try {
    const highs = await GameHighs.find({});
    res.json(highs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game highs', error });
  }
});

// Add new game high
gameHighsRoutes.post('/', async (req, res) => {
  try {
    const newHigh = new GameHighs(req.body);
    const savedHigh = await newHigh.save();
    res.status(201).json(savedHigh);
  } catch (error) {
    res.status(400).json({ message: 'Error adding game high', error });
  }
});

export default gameHighsRoutes;