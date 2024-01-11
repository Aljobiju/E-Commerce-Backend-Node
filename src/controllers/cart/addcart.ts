import { Request, Response } from 'express';
import EcCart from '../../models/ec_cart';
 
const addCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, quantity } = req.body;
        const { client_type, registrationId } = req.body.jwt_decoded;
        if (!product_id || !quantity || client_type != 'customer') {
            res.status(404).json({ error: 'Bad request' });
        }
        await EcCart.create({ product_id, registration_id: registrationId, quantity }, { raw: true });
        res.status(200).json({ message: 'Data inserted succesfully' })
 
    }
    catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};
 
export default addCart;