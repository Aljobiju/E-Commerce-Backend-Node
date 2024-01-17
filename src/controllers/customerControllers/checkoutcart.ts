import { Request, Response } from 'express';
import { Db, ObjectId } from 'mongodb';
import { client } from '../../services/mongodb';
import EcCart from '../../models/ec_cart';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51ORUlBSHq5EqE6NlIIjtrUNg8XYq8VrbZuIYgHEInSPs2qbOiZv1fhWLbLiUX6ykWfuY2Y3KWlVbhtUACEYRk3oO003KVzBoKC', {
    apiVersion: '2023-10-16',
  });

const cartCheckout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body.jwt_decoded;

    const db: Db = client.db('ECommerce');
    const productCollection = db.collection('products');

    const cartItems = await EcCart.findAll({
      where: { registration_id: userId },
      raw: true,
    });

    const productPrices = await Promise.all(
      cartItems.map(async (cartItem) => {
        const filter = new ObjectId(cartItem.product_id as string);
        const result = await productCollection.find({ _id: filter }).toArray();

        return {
          ...cartItem,
          productInfo: result[0],
        };
      })
    );

    const totalAmount = productPrices.reduce((total, cartItem) => {
      const quantity = cartItem.quantity || 0;
      const productPrice = cartItem.productInfo?.price || 0;

      return total + quantity * productPrice;
    }, 0);

    // Call the Stripe API to create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: 'inr',
        payment_method: 'pm_card_visa',
        confirm: true,
        return_url: 'https://yourwebsite.com/success',
      });

    // Return the client secret from the payment intent
    res.status(200).json({ clientSecret: paymentIntent.client_secret, totalAmount });
  } catch (error: any) {
    console.error('Error during cart checkout:', error);
    res.status(500).json({ error: error.toString() });
  }
};

export default cartCheckout;
