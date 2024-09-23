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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.DeleteUser = exports.FindUserById = exports.updateUser = exports.userSignup = exports.getAllUser = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = require("bcrypt");
const token_manager_1 = require("../utils/token_manager");
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get All users
        const users = yield user_model_1.default.find({});
        if (!users) {
            return res.status(401).json({ message: "cant find the user" });
        }
        return res.status(201).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllUser = getAllUser;
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({ message: "all feilds required" });
        }
        const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
        const user = new user_model_1.default({ name, email, password: hashedPassword });
        yield user.save();
        // create token and store cookie
        res.clearCookie("auth-token", {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true
        });
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth-token", token, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
            expires,
        });
        return res.status(201).json({ message: "Ok", id: user._id.toString() });
    }
    catch (error) {
        return res.status(404).json({ message: "Error in User Signup", error });
    }
});
exports.userSignup = userSignup;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { email, name, password } = req.body;
    user_model_1.default.findByIdAndUpdate(userId);
});
exports.updateUser = updateUser;
const FindUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            return res.status(401).json({ message: "user Not found" });
        }
        return res.status(201).json({ message: "Ok", user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.FindUserById = FindUserById;
const DeleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(404).json({ message: "not found" });
        }
        const user = yield user_model_1.default.findByIdAndDelete(userId);
        return res.status(201).json({ message: "User Deleted", user });
    }
    catch (error) {
        console.log(error);
    }
});
exports.DeleteUser = DeleteUser;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "all feilds required" });
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const isPasswordMatch = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordMatch) {
            return res.status(404).json({ message: "Incorrect Password" });
        }
        // Token And Cookie
        res.clearCookie("auth-token", {
            path: '/',
            domain: 'localhost',
            httpOnly: true,
            signed: true
        });
        const token = (0, token_manager_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("auth-token", token, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
            expires,
        });
        return res.status(201).json({ message: "Ok", id: user._id.toString() });
    }
    catch (error) {
        return res.status(404).json({ message: "Error in User Signup", error });
    }
});
exports.userLogin = userLogin;
//# sourceMappingURL=user_controller.js.map