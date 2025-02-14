// middleware/validate.js
import { body, validationResult } from 'express-validator';

// Validation middleware creator
const validateRequest = (validations) => {
    return async(req, res, next) => {
        // Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        next();
    };
};

// Registration validation rules
export const validateRegistration = validateRequest([
    body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter')
]);

// Login validation rules
export const validateLogin = validateRequest([
    body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

    body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
]);

// Workout validation rules
export const validateWorkout = validateRequest([
    body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),

    body('exercises')
    .isArray()
    .withMessage('Exercises must be an array')
    .notEmpty()
    .withMessage('At least one exercise is required'),

    body('exercises.*.name')
    .trim()
    .notEmpty()
    .withMessage('Exercise name is required'),

    body('exercises.*.sets')
    .isInt({ min: 1 })
    .withMessage('Sets must be at least 1'),

    body('exercises.*.reps')
    .isInt({ min: 1 })
    .withMessage('Reps must be at least 1'),

    body('exercises.*.weight')
    .isFloat({ min: 0 })
    .withMessage('Weight must be a positive number'),

    body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 minute'),

    body('date')
    .isISO8601()
    .withMessage('Invalid date format')
]);

// Error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map(error => error.message)
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }

    // Default error
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};