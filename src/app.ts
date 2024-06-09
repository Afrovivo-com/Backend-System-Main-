import {create} from './server';
import sess from "./config/sessions";
import dotenv from "dotenv";

dotenv.config()
const port = process.env.PORT || '3000';

const config = {
    env: 'development',
    port: parseInt(port),
    hostname: 'localhost'
}

const server = create(config);
server.use(sess);

server.listen(config.port, () => {
    console.log(`Listening with port number ${config.port}`);
})