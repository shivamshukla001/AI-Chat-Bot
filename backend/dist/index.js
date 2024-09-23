"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = require("./db/connection");
(0, connection_1.connectToDatabase)()
    .then(() => {
    app_1.default.listen(5000, () => {
        console.log("server Open AND Connected to the Database");
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map