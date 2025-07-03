import express from  "express"
import notesRoutes from "./routes/notesRoutes.js";
const app = express();
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/ratelimiter.js";
//import {Ratelimit} from '@upstash/ratelimit';
//import {Redis} from '@upstash/redis'; 
import cors from "cors";
//import ratelimit from "./config/upstash.js"; // Import the rate limiter configuration

dotenv.config();
app.use(cors({
  origin:"http://localhost:5173", // Allow requests from the frontend // Allow specific HTTP
}));
 
app.use(express.json()); 
app.use(ratelimiter); // Apply rate limiting middleware
const PORT = process.env.PORT || 5001;
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
 app.listen(PORT,() => {
  console.log("server is listening at port", PORT);
})    
});
  
// Middleware to parse JSON request bodies req.body
//our simple custom middleware to log requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request for '${req.url}'`); // Log the request method and URL
//   next(); // Proceed to the next middleware or route handler
// });