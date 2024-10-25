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
const bidTimers = new Map();

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('placeBid', async ({ stampId, userId, bidAmount }) => {
    try {
      const stamp = await Stamp.findById(stampId);

      if (bidAmount > stamp.current_highest_bid) {
        stamp.bids.push({ bidder: userId, amount: bidAmount });
        stamp.current_highest_bid = bidAmount;
        stamp.top_bidder = userId;
        await stamp.save();

        io.emit('newBid', { stampId, current_highest_bid: bidAmount, top_bidder: userId });

        // Reset the auction end timer
        if (bidTimers.has(stampId)) clearTimeout(bidTimers.get(stampId));
        const timer = setTimeout(async () => {
          // End auction and notify winner
          io.emit('auctionEnded', { stampId, winner: userId, finalBid: bidAmount });
          bidTimers.delete(stampId);
        }, 30000); // 30 seconds

        bidTimers.set(stampId, timer);
      } else {
        socket.emit('error', { message: 'Bid must be higher than the current highest bid' });
      }
    } catch (error) {
      console.error("Error processing bid:", error);
      socket.emit('error', { message: 'Error processing bid' });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})
  
  // Start the server
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });


  export { io };  