import { PrismaClient } from "@prisma/client";
import { getErrorMessage } from "../utils/errors";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export async function registerService(body:{
    'email':string;
    'password':string;
}) {
    try {
        const hashedpassword = await bcrypt.hash(body.password, 10)
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedpassword,

            }
        })

        return user;

    } catch (error) {
        throw new Error(getErrorMessage(error));
    } 

}


export async function loginService(body:{
    'email':string;
    'password': string;
}) {
    try {
        const user = await prisma.user.findOne();
        return user;
    } catch (error) {
        getErrorMessage(error);
    } finally {
        await prisma.$disconnect();
    }
}