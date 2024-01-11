import { client } from "../../services/mongodb";
import { ObjectId, Db } from 'mongodb';
import { Request, Response } from "express";

const db: Db = client.db("ECommerce");

export const getProductParams = async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.productId;

        const productsCollection = db.collection('products');

       //find and print
        const foundProduct = await productsCollection.findOne({ _id: new ObjectId(productId as string) });
        res.status(200).json({ foundProduct});
       
    } catch (error) {
        console.error("Error in updateProduct:", error);
        return res.status(500).json({ status: "Server Error" });
    }
};
