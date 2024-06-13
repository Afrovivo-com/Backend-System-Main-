import session from "express-session";
import dotenv from "dotenv";
 
dotenv.config();
const secretKey = process.env.SECRET_KEY as string

if (!secretKey) {
    throw new Error("No secret key found. Please define SECRET_KEY environment variable.");
}

const sess = session({
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