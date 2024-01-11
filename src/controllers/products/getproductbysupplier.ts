import { Db } from "mongodb";
import { client } from "../../services/mongodb";
import { Request, Response } from 'express';
 
const db: Db = client.db("ECommerce");
 
export const getProductSupplier = async (req: Request, res: Response): Promise<any> => {
    try {
        const { registrationId, client_type } = req.body.jwt_decoded;
        if (!registrationId || client_type != 'supplier') {
            res.status(404).json({ error: 'Bad request' });
        }
        const productCollection = db.collection('products');
        const result = await productCollection.find({ supplier_registration_id: registrationId }).toArray();
        res.status(200).json({ ...result });
    }
    catch (error) {
        res.status(500).json({ message: 'server error' });
    }
};
 