import session from "express-session";
const secretKey:string = process.env.SECRET_KEY

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