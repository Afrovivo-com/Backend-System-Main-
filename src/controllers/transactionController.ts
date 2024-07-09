import  {Request, Response} from "express";
import {createTransaction, getTransactionById, labelTransaction} from "../services/transactionLabelling";
import {Status} from "@prisma/client"
export const createTransactionController=async(req:Request, res:Response)=>
{
    try{
    const {storeId, productId, userId, amount, status}= req.body;
    
    if(!storeId || !productId || !userId || !amount)
    {
        return res.status(400).send({error: "All fields(storeId, productId, userId, amount) are required"});
        }
        const transaction = await createTransaction({storeId, productId,userId,amount,status});
        return res.status(201).send(transaction);
    }
    catch(error:any)
    {
        throw new Error(error.message);
        return res.status(500).send({error: error.message});
    }
}

export const getTransactionByIdController = async(req:Request, res: Response)=>
{
     try
     {
        const {userId} = req.params;
        const parseUserId = parseInt(userId);
        if(isNaN(parseUserId))
        {
            return res.status(400).send({error: "Invalid user ID"});
        }

        const transactions = await getTransactionById(parseUserId);
        return res.status(200).send(transactions);
     }
     catch(error:any){
        return res.status(500).send({ error: error.message });
     }
}


export const labelTransactionController = async (req: Request, res: Response) => {
    try {
        const { transactionId, status } = req.body;
        const parsedTransactionId = parseInt(transactionId);

        if (isNaN(parsedTransactionId) || !status) {
            return res.status(400).send({ error: "Invalid transaction ID or status" });
        }

        const transaction = await labelTransaction(parsedTransactionId, status);
        return res.status(200).send(transaction);
    } catch (error: any) {
        return res.status(500).send({ error: error.message });
    }
}