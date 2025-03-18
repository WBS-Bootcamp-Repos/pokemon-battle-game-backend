import Leaderboard from "../models/leaderboard.js";
import asyncHandler from "../utils/asyncHandler.js";
import errorResponse from "../utils/ErrorResponse.js";
import logger from "../utils/logger.js";


export const getLeaderboards = asyncHandler(async (req, res) => {
    logger.info("A GET request is made to get all the Scorecards")
    const leaderboards = await Leaderboard.find({});
    res.json(leaderboards);
})

export const createLeaderboard = asyncHandler(async (req, res) => {
    logger.info("A POST request is made to add a new Scorecard")
    const { body } = req;
    const leaderboard = await Leaderboard.create(body);
    res.status(201).json(leaderboard);
});

export const getLeaderboard = asyncHandler(async (req, res) => {
    logger.info("A GET request is made to get a SINGLE Scorecard")
    const {
        params: { id },
    } = req;
    // const leaderboard = await Leaderboard.findOne({ _id: id });
    const leaderboard = await Leaderboard.findById(id);
    if (!leaderboard) {
        throw new errorResponse(`Leaderboard with id ${id} not found`, 404);
    }

    res.json(leaderboard);
});


export const updateLeaderboard = asyncHandler(async (req, res) => {
    logger.warn("A PUT request is made to UPDATE a Single Scorecard")
    const {
        params: { id },
        body,
    } = req;
    const leaderboard = await Leaderboard.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
    });
    if (!leaderboard) {
        throw new ErrorResponse(`Leaderboard with id ${id} not found`, 404);
    }
    res.json(leaderboard);
});

// INSTEAD of async handler, I'm using a try-catch block
export const deleteLeaderboard = async (req, res, next) => {
    logger.error("A DELETE request is made to DELETE a Single Scorecard")
    try {
        const {
            params: { id },
        } = req;
        const leaderboard = await Leaderboard.findByIdAndDelete(id);
        if (!leaderboard) {
            throw new errorResponse(`Leaderboard with id ${id} not found`, 404);
        }
        res.json("Leaderboard deleted");
    } catch (error) {
        next(error);
    }
};