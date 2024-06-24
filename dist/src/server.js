"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const init_1 = require("./routes/init");
function create(config) {
    const server = (0, express_1.default)();
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);
    server.use(body_parser_1.default.json());
    (0, init_1.initRoutes)(server);
    return server;
}
exports.create = create;
