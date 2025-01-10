import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';

// import routes
import productRoutes from './routes/productRoutes.js'

dotenv.config(); // Only needs to be configured once

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy
// Option for Allowing All Origins
app.use(cors());

// Middleware for models
app.use('/api/products', productRoutes);

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

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000')
});