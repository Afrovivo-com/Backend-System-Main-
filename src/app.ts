import {create} from './server';
import sess from "./config/sessions";

const config = {
    env: 'development',
    port: 3000,
    hostname: 'localhost'
}

const server = create(config);
server.use(sess);

server.listen(config.port, () => {
    console.log(`Listening with port number ${config.port}`);
})