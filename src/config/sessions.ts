import session from "express-session";

const sess = session({
    secret: 'afrovivo@4567',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 2592000000
    }
})

export default sess