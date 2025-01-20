// Player model
import mongoose from 'mongoose';

// Define the schema for a Player
const playerSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    position: { type: String }, 
    team: { type: String },
  },
  {
    timestamps: true, 
  }
);

// Add an index to the name field for faster lookups
playerSchema.index({ name: 1 });

const Player = mongoose.model('Player', playerSchema, 'players');
export default Player;
