import Joi from "joi";

export const postSchema = Joi.object({
    firstname: Joi.string()
        .min(1)
        .max(30)
        .required()
        .messages({
            "string.empty": "Firstname is required",
            "string.min": "Firstname must be at least 2 characters",
            "string.max": "Firstname cannot exceed 30 characters"
        }),

    lastname: Joi.string()
        .min(1)
        .max(30)
        .required()
        .messages({
            "string.empty": "Lastname is required",
            "string.min": "Lastname must be at least 2 characters",
            "string.max": "Lastname cannot exceed 30 characters"
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