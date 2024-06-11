import { PrismaClient } from "@prisma/client";
import { getErrorMessage } from "../utils/errors";

const prisma = PrismaClient()

export async function registerService(body:{
    'email':string;
    'password':string;
}) {
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,

            }
        })

        return user;

    } catch (error) {
        getErrorMessage(error);
    } finally {
       await prisma.$disconnect();
    }

}


export async function loginService(body:{
    'email':string;
    'password': string;
}) {
    try {
        const user = await prisma.user.findOne();
    } catch (error) {
        getErrorMessage(error);
    } finally {
        await prisma.$disconnect();
    }
}