import mongoose from 'mongoose';

// GameStats model
const gameStatsSchema = mongoose.Schema(
  {
    player: { type: String, required: true },
    date: { type: Date },
    opponent: { type: String },
    result: { type: String },
    points: { type: Number },
    rebounds: { type: Number },
    assists: { type: Number },
    steals: { type: Number },
    blocks: { type: Number },
    turnovers: { type: Number },
  },
  {
    timestamps: true,
  }
);

const GameStats = mongoose.model("GameStats", gameStatsSchema, 'game_stats');
export default GameStats;
