import express, { Request, Response, Router } from "express";
import sequelize from "../config/sequelize-config";
import EcSuppliers from "../models/ec_suppliers";
import bcrypt from 'bcrypt';
import EcCustomers from "../models/ec_customers";
import jwt from 'jsonwebtoken';
import loginForm from "../controllers/authentication/loginForm";


 //importing from controllers
const login = express.Router();
  login.post("/", async (req: Request, res: Response) => {
    loginForm(req,res);
  }
  );

  export default login;
