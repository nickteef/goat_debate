import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

// Import routes
import playerRoutes from './routes/playerRoutes.js';
import gameStatsRoutes from './routes/gameStatsRoutes.js';
import seasonStatsRoutes from './routes/seasonStatsRoutes.js';
import salaryRoutes from './routes/salaryRoutes.js';
import allStarStatsRoutes from './routes/allStarStatsRoutes.js';
import gameHighsRoutes from './routes/gameHighsRoutes.js';

dotenv.config(); // Only needs to be configured once

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option for Allowing All Origins
app.use(cors());

// Middleware for models
app.use('/api/allstar-stats', allStarStatsRoutes);
app.use('/api/game-highs', gameHighsRoutes);
app.use('/api/game-stats', gameStatsRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/season-stats', seasonStatsRoutes);


// Production 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

app.get("/", async (req, res) => {
    res.send("Server is ready");
})

app.listen(5000, async () => {
  await connectDB();
  console.log('Server started at http://localhost:5000');
});