import express, { Request, Response, Router } from "express";
import sequelize from "../config/sequelize-config";
import EcCustomers from "../models/ec_customers";
import customerRegistration from "../controllers/customerControllers/customerRegistration";
import { customerGet } from "../controllers/customerControllers/customerRegistration";
import customerProfile from "../controllers/customerControllers/customerProfile";
import { verifyToken } from "../middleware/verifyJwt";
import addCart from "../controllers/customerControllers/addcart";

  //importing from controllers
const customerRouter = express.Router();
customerRouter.get("/", async (req: Request, res: Response) => {
   customerGet(req,res);
  });


    //importing from controllers
  customerRouter.post("/reg", async (req: Request, res: Response) => {
   customerRegistration(req,res);
  });

  customerRouter.post("/getprofile",verifyToken , (req: Request, res: Response) => {
    customerProfile(req,res);
   });

   //CART

   customerRouter.post("/addcart",verifyToken, async (req: Request, res: Response) => {
    addCart(req,res);
   });




  export default customerRouter;
