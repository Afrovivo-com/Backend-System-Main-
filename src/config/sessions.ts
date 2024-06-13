import session from "express-session";
import dotenv from "dotenv";
 
dotenv.config();
const secretKey = process.env.SECRET_KEY

const sess = session({
    secret: secretKey as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 2592000000
    }
})

export default sess