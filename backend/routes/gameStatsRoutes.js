// GameStats routes
import express from 'express';
import GameStats from '../models/GameStats.js';

const gameStatsRoutes = express.Router();

// Get all game stats
gameStatsRoutes.get('/', async (req, res) => {
  try {
    const stats = await GameStats.find({});
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching game stats', error });
  }
});

// Add new game stats
gameStatsRoutes.post('/', async (req, res) => {
  try {
    const newStats = new GameStats(req.body);
    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    res.status(400).json({ message: 'Error adding game stats', error });
  }
});

export default gameStatsRoutes;