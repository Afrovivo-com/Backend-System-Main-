import session from "express-session";

const sess = session({
    secret: 'rBwD183!@#EfGI456$%^pjKl789&*()MnOpQr%$&vWxY56',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 2592000000
    }
})

export default sess