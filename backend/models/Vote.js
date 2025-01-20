import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
  player: { type: String, required: true, unique: true },
  votes: { type: Number, default: 0 },
});

const Vote = mongoose.model('Vote', voteSchema, 'votes');
export default Vote;