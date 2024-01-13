import EcCustomers from "../../models/ec_customers";
import { Request, Response } from "express";
import crypto from 'crypto';

// Customer view
const customerProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { e_mail } = req.body;

    const found = await EcCustomers.findOne({
      where: { e_mail },
      attributes: ['e_mail', 'full_name'],
      raw: true,
    });

    console.log(found);

    if (found) {
      res.send(found);
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (error) {
    console.error("Error in customerProfile:", error);
    res.status(500).send("Internal Server Error");
  }
};

export default customerProfile;
