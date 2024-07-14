import { Request, Response } from "express";
import { createStore, getAllStores, getStoreByID, getStoresByOwnerID, deleteStore } from "../services/storeService";

export const createStoreController = async (req:Request, res:Response) => {
    try {
        const {name, facebook, twitter, instagram, tiktok, youtube, linkedln, medium}:{
            name:string, 
            facebook:string, 
            twitter:string, 
            instagram:string,
            youtube:string,
            tiktok:string,
            linkedln:string,
            medium:string
        } = req.body;
        const store = await createStore({
            name, facebook, twitter, instagram, youtube, tiktok, linkedln, medium
        });
        return res.status(201).send(store);
    } catch (error:any) {
        return res.status(400).send(error);
    }
}

export const getAllStoresController = async (req:Request, res:Response) => {
    try {
        const stores = await getAllStores()
        return res.status(200).send(stores);
    } catch (error:any) {
        return res.status(404).send(error);
    }
}

export const getStoreByIDController = async (req:Request, res:Response) => {
    try {
        const {params:{id}} = req;
        const parsedID = parseInt(id)
        const store = await getStoreByID(parsedID);
        return res.status(200).send(store);
    } catch (error:any) {
        return res.status(404).send(error)
    }
}

export const getStoresByOwnerIDController = async (req:Request, res:Response) => {
    try {
        const {params:{ownerID}} = req;
        const parsedOwnerID = parseInt(ownerID);
        const stores = await getStoresByOwnerID(parsedOwnerID);
        return res.status(200).send(stores);
    } catch (error:any) {
        return res.status(404).send(error);
    }
}

export const deleteStoreController = async (req:Request, res:Response) => {
    try {
        const { params:{id} } = req;
        const parsedID = parseInt(id);
        const store = await deleteStore(parsedID);
        return res.status(204).send(store);
    } catch (error) {
        return res.status(404).send(error);
    }
}