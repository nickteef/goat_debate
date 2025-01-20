import express from "express";
import Vote from "../models/Vote.js";

const router = express.Router();

// Get all votes
router.get("/", async (req, res) => {
  try {
    const votes = await Vote.find({});
    const votesData = votes.reduce((acc, vote) => {
      acc[vote.player] = vote.votes;
      return acc;
    }, {});
    res.json(votesData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching votes", error });
  }
});

// Update vote count
router.post("/", async (req, res) => {
  const { player } = req.body;
  try {
    let vote = await Vote.findOne({ player });
    if (!vote) {
      vote = new Vote({ player, votes: 0 });
    }
    vote.votes += 1;
    await vote.save();

    const votes = await Vote.find({});
    const votesData = votes.reduce((acc, vote) => {
      acc[vote.player] = vote.votes;
      return acc;
    }, {});

    res.json(votesData);
  } catch (error) {
    res.status(500).json({ message: "Error voting", error });
  }
});

export default router;
