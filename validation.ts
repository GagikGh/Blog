import Joi from "joi";

export const postSchema = Joi.object({
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

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be valid"
    }),
    password: Joi.string().min(6).max(100).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password cannot be longer than 100 characters"
    }),
});

export const registerSchema = Joi.object({
    firstname: Joi.string().required().messages({
        "string.empty": "Firstname is required",
        "string.min": "Firstname must be at least 2 characters",
        "string.max": "Firstname cannot exceed 30 characters"
    }),

    lastname: Joi.string().required().messages({
        "string.empty": "Lastname is required",
        "string.min": "Lastname must be at least 2 characters",
        "string.max": "Lastname cannot exceed 30 characters"
    }),

    phone: Joi.string().min(6).max(100).required().messages({
        "string.empty": "Phone is required",
        "string.min": "Phone must be at least 2 characters",
        "string.max": "Phone cannot exceed 100 characters"
    }),

    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be valid"
    }),
    password: Joi.string().min(6).max(100).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
        "string.max": "Password cannot be longer than 100 characters"
    }),

})