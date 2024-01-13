import express, { Request, Response, Router } from "express";
import sequelize from "../config/sequelize-config";
import EcSuppliers from "../models/ec_suppliers";
import supplierRegistration from "../controllers/supplierControllers/supplierRegistration";
import { getSupplier } from "../controllers/supplierControllers/supplierRegistration";
import supplierProfile from "../controllers/supplierControllers/supplierProfile";
import { verifyToken } from "../middleware/verifyJwt";
import { getProductSupplier } from "../controllers/supplierControllers/getproductbysupplier";
import multer from "multer";
import { addProduct } from "../controllers/supplierControllers/addproduct";
import { updateProduct } from "../controllers/supplierControllers/editproduct";
import { getProduct } from "../controllers/supplierControllers/getproduct";




 //importing from controllers
const supplierRouter = express.Router();

const storage=multer.memoryStorage();
const upload=multer({storage:storage});




supplierRouter.get("/", async (req: Request, res: Response) => {
  getSupplier(req,res); 
  });

  //importing from controllers
  supplierRouter.post("/reg", upload.single("profile_pic"), async (req: Request, res: Response) => {
    supplierRegistration(req,res);
  });

  supplierRouter.post("/getprofile",verifyToken , (req: Request, res: Response) => {
    supplierProfile(req,res);
   });

   supplierRouter.post("/getsupplierproducts",verifyToken , (req: Request, res: Response) => {
    getProductSupplier(req,res);
   });

//products

supplierRouter.post("/addproduct",verifyToken, async (req: Request, res: Response) => {
    addProduct(req,res);
  }
  );

  supplierRouter.patch("/editproduct",verifyToken,async(req:Request,res:Response)=>{
    updateProduct(req,res);
  })

  supplierRouter.get("/getproduct",verifyToken,async(req:Request,res:Response)=>{
    getProduct(req,res);
  })

   

  export default supplierRouter;
