import { client } from "../../services/mongodb";
import { ObjectId, Db } from 'mongodb';
import { Request, Response } from "express";

const db: Db = client.db("ECommerce");

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const {productId} = req.body;

        // if (!productId) {
        //     return res.status(400).json({ status: "Bad request", message: "Product ID is required for updating" });
        // }

        const updatedData = req.body;

        const productsCollection = db.collection('products');

        // Find the product by ID and update it
        const result = await productsCollection.updateOne(
            { _id: new ObjectId(productId) }, // Assuming the product has an ObjectId as _id
            { $set: updatedData }
        );

        // Check if the product was found and updated
        if (result.modifiedCount === 1) {
            return res.status(200).json({ message: "Update successful" });
        } else {
            return res.status(404).json({ status: "Not Found", message: "Product not found" });
        }
    } catch (error) {
        console.error("Error in updateProduct:", error);
        return res.status(500).json({ status: "Server Error" });
    }
};
