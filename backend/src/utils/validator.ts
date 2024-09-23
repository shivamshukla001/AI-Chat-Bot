import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Run each validation in sequence
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }

        // Check the validation results
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Return validation errors
        return res.status(422).json({ errors: errors.array() });
    };
};
export const LoginValidator = [
    body('email').trim().isEmail().withMessage("Email is required"),
    body('password').trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

export const signupValidator = [
    body('name').notEmpty().withMessage("Name is required"),
    ...LoginValidator
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message  is required"),
  ];


