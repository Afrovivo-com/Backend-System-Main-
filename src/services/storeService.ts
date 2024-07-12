import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createStore = async (data:any) => {
    try {
        const store = await prisma.store.create({ data });
        return store;
    } catch (error:any) {
        throw new Error(error);
    }
    
}

export const getAllStores = async () => {
    try {
        const stores = await prisma.store.findMany();
        return stores;    
    } catch (error:any) {
        throw new Error(error);
    }

}

export const getStoreByID = async (id:number) => {
    const store = await prisma.store.findUnique({
        where: {
            id:id,
        },
    });
    
    if (!store) {
        throw new Error("No such store with that id");
    }
    return store;
}

export const getStoresByOwnerID = async (ownerID:number) => {
    const store = await prisma.store.findMany({
        where:{
            ownerId:ownerID,
        },
    });

    if (!store) {
        throw new Error("No such stores with that owners id");
    }
    return store;
}

export const deleteStore = async (id:number) => {
    try {
        await prisma.store.delete({
            where: {
                id:id,
            },
        });
    } catch (error:any) {
        throw new Error(error);
    }
}
