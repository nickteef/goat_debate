// AllStarStats routes
import express from 'express';
import AllStarStats from '../models/AllStarStats.js';

const allStarStatsRoutes = express.Router();

// Get all All-Star stats
allStarStatsRoutes.get('/', async (req, res) => {
  try {
    const stats = await AllStarStats.find({});
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching All-Star stats', error });
  }
});

// Add new All-Star stats
allStarStatsRoutes.post('/', async (req, res) => {
  try {
    const newStats = new AllStarStats(req.body);
    const savedStats = await newStats.save();
    res.status(201).json(savedStats);
  } catch (error) {
    res.status(400).json({ message: 'Error adding All-Star stats', error });
  }
});

export default allStarStatsRoutes;