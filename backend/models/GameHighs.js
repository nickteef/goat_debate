import mongoose from 'mongoose';

// GameHighs model
const gameHighsSchema = mongoose.Schema(
    {
      player: { type: String, required: true },
      season: { type: String, required: true },
      points: { type: Number },
      rebounds: { type: Number },
      assists: { type: Number },
      steals: { type: Number },
      blocks: { type: Number },
    },
    {
      timestamps: true,
    }
  );
  
  const GameHighs = mongoose.model('GameHighs', gameHighsSchema, 'game_highs');
  export default GameHighs;