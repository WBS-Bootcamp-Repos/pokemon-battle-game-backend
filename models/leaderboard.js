import { Schema, model } from "mongoose";

const leaderboardSchema = new Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
})

const Leaderboard = model("Leaderboard", leaderboardSchema);
export default Leaderboard;