import EcCustomers from "../../models/ec_customers";
import { Request, Response } from "express";
import EcSuppliers from "../../models/ec_suppliers";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Function
const loginForm = async (req: Request, res: Response): Promise<void> => {
  const { client_type, e_mail, password } = req.body;

  if (client_type == "customer") {
    try {
      const foundUser = await EcCustomers.findOne({
        where: { e_mail: e_mail },
      });

      if (foundUser) {
        const storedHashPassword = foundUser.password;

        // Compare entered password with stored hashed password
        if (hashPassword(password) === storedHashPassword) {
          const token = jwt.sign(
            {
              userId: foundUser.id,
              client_type,
            },
            'your-secret-key',
            { expiresIn: '24h' }
          );

          res.status(200).json({
            message: "User found",
            token: token,
          });
        } else {
          res.status(401).json({
            message: "Password does not match",
          });
        }
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error during customer login:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  } else {
    // Supplier login logic (similar to customer logic)
    try {
      const foundUser = await EcSuppliers.findOne({
        where: { e_mail: e_mail },
      });

      if (foundUser) {
        const storedHashPassword = foundUser.password;

        // Compare entered password with stored hashed password
        if (hashPassword(password) === storedHashPassword) {
          res.status(200).json({
            message: "User found",
          });
        } else {
          res.status(401).json({
            message: "Password does not match",
          });
        }
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error during supplier login:", error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
};

export default loginForm;

// Function for encryption
function hashPassword(password: any) {
  // Create a hash object with the 'sha256' algorithm
  const hash = crypto.createHash('sha256');

  // Update the hash object with the password
  hash.update(password);

  // Get the hashed password in hexadecimal format
  const hashedPassword = hash.digest('hex');

  return hashedPassword;
}
