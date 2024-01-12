import express, { Request, Response, Router } from "express";
import { addProduct } from "../controllers/supplierControllers/addproduct";
import { verifyToken } from "../middleware/verifyJwt";
import { updateProduct } from "../controllers/supplierControllers/editproduct";
import { getProduct } from "../controllers/supplierControllers/getproduct";


 //importing from controllers
const addingproduct = express.Router();
  addingproduct.post("/add",verifyToken, async (req: Request, res: Response) => {
    addProduct(req,res);
  }
  );

addingproduct.patch("/edit",verifyToken,async(req:Request,res:Response)=>{
  updateProduct(req,res);
})

addingproduct.get("/get",verifyToken,async(req:Request,res:Response)=>{
  getProduct(req,res);
})

  export default addingproduct;
