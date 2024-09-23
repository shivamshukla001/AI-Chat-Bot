"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
const chatSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: (0, crypto_1.randomUUID)()
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    }
}, { timestamps: true });
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    Chat: [chatSchema]
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user_model.js.map