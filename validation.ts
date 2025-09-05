import Joi from "joi";

export const postSchema = Joi.object({
    author: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
            "string.empty": "Author's name is required",
            "string.min": "Author's name must be at least 2 characters",
            "string.max": "Author's name cannot exceed 30 characters"
        }),

    title: Joi.string()
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title must be at least 2 characters",
            "string.max": "Title cannot exceed 30 characters"
        }),

    description: Joi.string()
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 2 characters",
            "string.max": "Description cannot exceed 30 characters"
        }),
});