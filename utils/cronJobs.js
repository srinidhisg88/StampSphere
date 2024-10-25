import cron from "node-cron";
import Stamp from "../models/stamp.model.js";
import { io } from "../server.js"; // Assuming you export `io` from server.js

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const stamps = await Stamp.find({ is_sold: false, auction_end_date: { $lte: now } });

  for (const stamp of stamps) {
    stamp.is_sold = true;
    await stamp.save();

    // Notify top bidder they won
    io.to(stamp.top_bidder).emit("auctionEnded", { message: `You've won ${stamp.name}!` });
  }
});
