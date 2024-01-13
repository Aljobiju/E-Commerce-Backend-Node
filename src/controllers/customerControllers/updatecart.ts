import { Request, Response } from 'express';
import EcCart from '../../models/ec_cart';
 
const updateCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { product_id, quantity } = req.body;
        const { userId, client_type } = req.body.jwt_decoded;
        if (!product_id || !quantity || client_type != 'customer') {
            res.status(404).json({ error: 'Bad request' });
        }
        const data = await EcCart.update({ quantity }, { where: { product_id } });
        console.log(data);
        res.status(200).json({ message: 'Data updated successfully' });
    }
    catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};
 
export default updateCart;