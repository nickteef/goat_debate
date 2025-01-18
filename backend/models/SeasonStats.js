// SeasonStats model
import mongoose from 'mongoose';

const seasonStatsSchema = mongoose.Schema(
    {
      player: { type: String, required: true },
      season: { type: String, required: true },
      gamesPlayed: { type: Number },
      pointsPerGame: { type: Number },
      reboundsPerGame: { type: Number },
      assistsPerGame: { type: Number },
      advancedStats: {
        PER: { type: Number },
        TSPercent: { type: Number },
        WS: { type: Number },
      },
    },
    {
      timestamps: true,
    }
  );
  
  const SeasonStats = mongoose.model('SeasonStats', seasonStatsSchema, 'season_stats');
  export default SeasonStats;