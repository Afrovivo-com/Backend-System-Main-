import { PrismaClient, Status} from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaction =async(data: any)=>
{
    try {
        const transaction = await prisma.transaction.create({data});
        return transaction;
    } catch (error:any) {
        
        throw new Error(error.message);
    }
}


export const getTransactionById = async(userId:number)=>
{
    try {
        const transactions = await prisma.transaction.findMany({
            where: {userId},
            include: {
                store: true,
                product: true,
                user: true
            }
        });
        return transactions;
    } catch (error:any) {
        throw new Error(error.message);
        
    }
}

export const labelTransaction = async (transactionId: number, label: Status) => {
    try {
        const transaction = await prisma.transaction.update({
            where: { id: transactionId },
            data: { status: label },
        });
        return transaction;
    } catch (error: any) {
        throw new Error(error.message);
    }
}