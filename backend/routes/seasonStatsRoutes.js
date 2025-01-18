// SeasonStats routes
import express from 'express';
import SeasonStats from '../models/SeasonStats.js';

const seasonStatsRoutes = express.Router();

// Get all season stats
seasonStatsRoutes.get('/', async (req, res) => {
  try {
    const stats = await SeasonStats.find({});
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching season stats', error });
  }
});

// Add new season stats
seasonStatsRoutes.post('/', async (req, res) => {
  try {
    const newStats = new SeasonStats(req.body);
    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    res.status(400).json({ message: 'Error adding season stats', error });
  }
});

export default seasonStatsRoutes;