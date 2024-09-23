"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id, email, expiresIn) => {
    const paylord = { id, email };
    const token = jsonwebtoken_1.default.sign(paylord, process.env.JWT_SECRETE_KEY, {
        expiresIn,
    });
    return token;
};
exports.createToken = createToken;
//# sourceMappingURL=token_manager.js.map