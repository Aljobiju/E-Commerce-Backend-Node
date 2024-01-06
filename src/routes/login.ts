import express, { Request, Response, Router } from "express";
import sequelize from "../config/sequelize-config";
import EcSuppliers from "../models/ec_suppliers";
import bcrypt from 'bcrypt';
import EcCustomers from "../models/ec_customers";
import jwt from 'jsonwebtoken';


const login = express.Router();
  login.post("/", async (req: Request, res: Response) => {
    const { client_type, e_mail, password } = req.body;

    if (client_type == "customer") {
        const foundUser = await EcCustomers.findOne({
          where: { e_mail: e_mail },
        });
    
        if (foundUser) {
          const storedHashPassword = foundUser.password; 
    
          // Compare entered password with stored hashed password
          // const passwordMatch = bcrypt.compareSync(password, storedHashPassword);
          if (password==storedHashPassword){
            const token =jwt.sign({
              userId:foundUser.id,client_type},
              'secret_key',
              {expiresIn:'24h'}
            )
          res.json(token);
          // if (passwordMatch) {
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
    } else {
      
      const foundUser = await EcSuppliers.findOne({
        where: { e_mail: e_mail },
      });
  
      if (foundUser) {
        const storedHashPassword = foundUser.password; 
  
        // Compare entered password with stored hashed password
        // const passwordMatch = bcrypt.compareSync(password, storedHashPassword);
        if(password==storedHashPassword){

        
        // if (passwordMatch) {
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


    }
    
  }
  );

  export default login;
