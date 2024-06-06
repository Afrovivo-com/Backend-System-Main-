import express from "express";
import sess from "./config/sessions";

const server = express();

const PORT = process.env.PORT || 3000;

server.set('trust proxy', 1)
server.use(sess)

server.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})