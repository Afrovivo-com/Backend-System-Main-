"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
//import { createClient } from "redis";
//import RedisStore from "connect-redis";
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error("No secret key found. Please define SECRET_KEY environment variable.");
}
/**
const reidsClient = createClient();
reidsClient.connect().catch(console.error);


const redisStore = new RedisStore({
    client: reidsClient,
    prefix: 'afrovivo',
})
*/
const sess = (0, express_session_1.default)({
    //    store: redisStore,
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 2592000000
    }
});
exports.default = sess;
