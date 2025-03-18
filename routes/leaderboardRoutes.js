import express from "express";
import { getLeaderboards, createLeaderboard, getLeaderboard, updateLeaderboard, deleteLeaderboard } from "../controllers/leaderboardController.js";
import validateSchema from "../middleware/validateSchema.js";
import { createLeaderboardSchema, updateLeaderboardSchema } from "../schemas/leaderboardSchema.js";

const router = express.Router();

router.route("/").get(getLeaderboards).post(validateSchema(createLeaderboardSchema), createLeaderboard);
router.route("/:id").get(getLeaderboard).put(validateSchema(updateLeaderboardSchema), updateLeaderboard).delete(deleteLeaderboard);

export default router;