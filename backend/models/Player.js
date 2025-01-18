// Player model
import mongoose from 'mongoose';

// Define the schema for a Player
const playerSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // The player's name; must be unique to avoid duplicates
    position: { type: String }, // The player's position (e.g., SG, SF, PG, etc.)
    team: { type: String }, // The team the player belongs to (optional)
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Add an index to the name field for faster lookups
playerSchema.index({ name: 1 });

const Player = mongoose.model('Player', playerSchema, 'players');
export default Player;
