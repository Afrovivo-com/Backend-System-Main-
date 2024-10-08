import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"

dotenv.config();

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
const secretKey = process.env.SECRET_KEY
 
export const registerUser = async(email:string, password:string) =>
    {
        //hasing the password
        const hashedPassword=  await bcrypt.hash(password,18);
        const user = await prisma.user.create(
            {
                data:
                {
                    email,
                    password: hashedPassword
                }
            }
        )
        return user
    }

    //Authenticate The User
    export const authenticateUser= async(email:string, password:string)=>
        {
            const user = await prisma.user.findUnique(
                {
                    where: {email}
                }
            )
            if (!user)
                {
                    throw new Error('Invalid email and password');
                }
                //validate the password
                const validPassword = await bcrypt.compare(password, user.password);
                if(!validPassword)
                    {
                        throw new Error("Invalid password");
                    }

                    const token  = jwt.sign({userId: user.id},
                        secretKey as string,{expiresIn: '1h'}
                    );
                    return {token, user}
        }