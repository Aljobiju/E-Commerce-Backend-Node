import express, { Request, Response, Router } from "express";
import { addProduct } from "../controllers/products/addproduct";
import { verifyToken } from "../middleware/verifyJwt";

 //importing from controllers
const getparams = express.Router();
  getparams.post("/getUniqueProduct/:_id",verifyToken, async (req: Request, res: Response) => {
    addProduct(req,res);
  }
  );

  export default getparams;
