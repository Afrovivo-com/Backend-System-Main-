import express from "express";
import bodyParser from 'body-parser';
import { initRoutes } from "./routes/init";
import PaymentRoutes from "../PaymentRoutes"

app.use('/api', paymentRoutes);

export function create(config:{
    env: string;
    port: number;
    hostname: string;
}) {
    const server = express();
    server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);

    server.use(bodyParser.json());

    initRoutes(server);

    return server;
}
