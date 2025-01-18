// Minimal playerRoutes.js
import express from 'express';
import Player from '../models/Player.js';

const router = express.Router();

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find({});
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching players', error });
  }
});

export default router;