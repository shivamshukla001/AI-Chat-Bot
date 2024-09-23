"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const validator_1 = require("../utils/validator");
const userRouter = (0, express_1.Router)();
userRouter.get('/', user_controller_1.getAllUser);
userRouter.post('/signup', (0, validator_1.validate)(validator_1.signupValidator), user_controller_1.userSignup);
userRouter.post('/login', (0, validator_1.validate)(validator_1.LoginValidator), user_controller_1.userLogin);
userRouter.get('/:id', user_controller_1.FindUserById);
userRouter.delete('/:id', user_controller_1.DeleteUser);
exports.default = userRouter;
//# sourceMappingURL=user-route.js.map