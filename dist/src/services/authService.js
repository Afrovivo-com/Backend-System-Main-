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
exports.authenticateUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const secretKey = process.env.SECRET_KEY;
const registerUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    //hasing the password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 18);
    const user = yield prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
    });
    return user;
});
exports.registerUser = registerUser;
//Authenticate The User
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new Error('Invalid email and password');
    }
    //validate the password
    const validPassword = yield bcryptjs_1.default.compare(password, user.password);
    if (!validPassword) {
        throw new Error("Invalid password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return { token, user };
});
exports.authenticateUser = authenticateUser;
