import express from 'express';
import notesRoutes from './routes/notesRoutes.js'; // Importing the notes routes
import { connect } from 'mongoose';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import ratelimiter from './middleware/rateLimiter.js'; // Importing the rate limiter middleware
import cors from "cors"


dotenv.config(); // Load environment variables from .env file


const app = express();
const PORT = process.env.PORT || 5001; // Use PORT from environment variables or default to 5001


app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(ratelimiter); // Applying the rate limiter middleware to all routes



app.use("/api/notes", notesRoutes); // Using the notes routes for the "/api/notes" path

// Connect to the database and start the server
// This ensures that the server starts only after a successful database connection
connectDB().then(() => {
  app.listen(PORT, () => {
  console.log('Server started on PORT: ', PORT);
});

});


//what is endpoint?
// An endpoint is a specific URL where an API can be accessed by a client application. It represents a specific function or resource in the API, allowing clients to interact with the server to perform actions like retrieving data, submitting data, or updating resources. Endpoints are defined by their URL paths and the HTTP methods (GET, POST, PUT, DELETE, etc.) used to access them.


