import express, { Request, Response, Router } from "express";
import sequelize from "../config/sequelize-config";
import EcCustomers from "../models/ec_customers";
import customerRegistration from "../controllers/customerControllers/customerRegistration";
import { customerGet } from "../controllers/customerControllers/customerRegistration";
import resetPassword from "../controllers/authentication/resetPassword";
import { verifyToken } from "../middleware/verifyJwt";

  //importing from controllers
  const updatepasswordRouter = express.Router();
  updatepasswordRouter.patch("/", verifyToken, (req: Request, res: Response) => {
     resetPassword(req,res);
    });
  
    export default updatepasswordRouter;
