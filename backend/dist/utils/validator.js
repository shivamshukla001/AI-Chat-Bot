"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = exports.LoginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Run each validation in sequence
        for (let validation of validations) {
            const result = yield validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        // Check the validation results
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        // Return validation errors
        return res.status(422).json({ errors: errors.array() });
    });
};
exports.validate = validate;
exports.LoginValidator = [
    (0, express_validator_1.body)('email').trim().isEmail().withMessage("Email is required"),
    (0, express_validator_1.body)('password').trim().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];
exports.signupValidator = [
    (0, express_validator_1.body)('name').notEmpty().withMessage("Name is required"),
    ...exports.LoginValidator
];
//# sourceMappingURL=validator.js.map