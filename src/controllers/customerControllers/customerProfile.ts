import EcCustomers from "../../models/ec_customers";
import { Request, Response } from "express";
import crypto from 'crypto'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EcSuppliers from "../../models/ec_suppliers";


// const cusProfile = async(req:Request,res:Response):Promise<void>=>{
//     try{
//         const{e_mail}=req.body;
//     }
// }

// Function to update customer password
const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { e_mail, new_password } = req.body;
    const { client_type } = req.body.jwt_decoded;

    if (client_type === "customer") {
      await EcCustomers.update(
        { password: new_password },
        {
          where: { e_mail },
        }
        
      );

      res.status(200).json({ message: "Password updated successfully" });
    } else if (client_type === "supplier") { // Corrected the condition here
      await EcSuppliers.update(
        { password: new_password },
        {
          where: { e_mail },
        }
      );

      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(400).json({ message: "Invalid client type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export default resetPassword;