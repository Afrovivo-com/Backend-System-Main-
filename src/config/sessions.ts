import session from "express-session";
import dotenv from "dotenv";
import { createClient } from "redis";
import RedisStore from "connect-redis";
 
dotenv.config();
const secretKey = process.env.SESSION_SECRET_KEY as string

if (!secretKey) {
    throw new Error("No secret key found. Please define SECRET_KEY environment variable.");
}


const reidsClient = createClient();
reidsClient.connect().catch(console.error);


const redisStore = new RedisStore({
    client: reidsClient,
    prefix: 'afrovivo',
})

const sess = session({
    store: redisStore,
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 2592000000
    }
})

export default sess