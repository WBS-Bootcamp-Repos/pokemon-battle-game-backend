import Joi from "joi";

export const createLeaderboardSchema = Joi.object({
    username: Joi.string().required(),
    score: Joi.number().required().min(0)
});

export const updateLeaderboardSchema = Joi.object({
    username: Joi.string().required(),
    score: Joi.number().required().min(0)
}).min(1);