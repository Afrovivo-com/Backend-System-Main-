import { Request, Response, Express } from "express";

export function initRoutes(server:Express) {
    server.get("/", (request:Request, response:Response) => {
        response.status(200).send("Welcome from Afrovivo");
    })
}