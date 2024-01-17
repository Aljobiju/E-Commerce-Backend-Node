import { Request, Response } from 'express';
import EcCart from '../../models/ec_cart';
 
const getCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, client_type } = req.body.jwt_decoded;
        if (!userId || client_type != 'customer') {
            res.send(404).json({ error: 'Bad request' });
        }
        const cartData = await EcCart.findAll({ where: { registration_id: userId }, raw: true });
        res.status(500).json({ ...cartData });

    }
    catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};
 
export default getCart;