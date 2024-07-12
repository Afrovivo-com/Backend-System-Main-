"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const authRoute_1 = __importDefault(require("./authRoute"));
function initRoutes(server) {
    server.get("/", (request, response) => {
        response.status(200).send("Welcome from Afrovivo");
    });
    server.use("/auth", authRoute_1.default);
}
exports.initRoutes = initRoutes;
