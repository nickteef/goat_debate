import mongoose from 'mongoose';

// AllStarStats model
const allStarStatsSchema = mongoose.Schema(
    {
      player: { type: String, required: true },
      season: { type: String, required: true },
      points: { type: Number },
      rebounds: { type: Number },
      assists: { type: Number },
    },
    {
      timestamps: true,
    }
  );
  
  const AllStarStats = mongoose.model('AllStarStats', allStarStatsSchema, 'allstar_stats');
  export default AllStarStats;