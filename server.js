import express from 'express';
import connectDb from './config/db.js';
import cors from 'cors';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectCloudinary from './config/cloudinary.js';
import http from 'http';
import { Server } from 'socket.io';
import Stamp from './models/stamps.schema.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();
connectCloudinary()
// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: [`http://localhost:5173`], credentials: true }));

const server = http.createServer(app);

//socket.io setup
const io = new Server(server, {
    cors: {
      origin: [`http://localhost:5173`], // Adjust to your frontend's origin
      credentials: true,
    }
  });
app.use('/uploads', express.static('uploads')); // to serve static files


// Routes
app.use('/api', router);
app.get('/', (req, res) => {
    res.send('index route');
});

// Start the server

// Socket.IO logic for real-time bidding
io.on('connection', (socket) => {
    console.log('New user connected');
  
    // Listening for bid events
    socket.on('placeBid', async ({ stampId, userId, bidAmount }) => {
      try {
        const stamp = await Stamp.findById(stampId);
        // Check if the bid is higher than the current highest bid
        if (bidAmount > stamp.current_highest_bid) {
          // Update bid details
          stamp.bids.push({ bidder: userId, amount: bidAmount });
          stamp.current_highest_bid = bidAmount;
          stamp.top_bidder = userId;
          await stamp.save();
  
          // Emit an updated bid event to all clients
          io.emit('newBid', { stampId, current_highest_bid: bidAmount, top_bidder: userId });
        } else {
          socket.emit('error', { message: 'Bid must be higher than the current highest bid' });
        }
      } catch (error) {
        console.error("Error processing bid:", error);
        socket.emit('error', { message: 'Error processing bid' });
      }
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
  // Start the server
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


  export { io };  