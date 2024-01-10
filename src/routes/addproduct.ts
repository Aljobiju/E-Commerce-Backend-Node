import express, { Request, Response, Router } from "express";
import { addProduct } from "../controllers/products/addproduct";
import { verifyToken } from "../middleware/verifyJwt";
import { updateProduct } from "../controllers/products/editproduct";

 //importing from controllers
const addingproduct = express.Router();
  addingproduct.post("/",verifyToken, async (req: Request, res: Response) => {
    addProduct(req,res);
  }
  );

const editProduct =express.Router();
editProduct.patch("/",verifyToken,async(req:Request,res:Response)=>{
  updateProduct(req,res);
})

  export {editProduct};
  export default addingproduct;
