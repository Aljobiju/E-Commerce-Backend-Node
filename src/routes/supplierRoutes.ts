import express, { Request, Response, Router } from "express";
import sequelize from "../config/sequelize-config";
import EcSuppliers from "../models/ec_suppliers";
import supplierRegistration from "../controllers/supplierControllers/supplierRegistration";
import { getSupplier } from "../controllers/supplierControllers/supplierRegistration";
import supplierProfile from "../controllers/supplierControllers/supplierProfile";
import { verifyToken } from "../middleware/verifyJwt";
import { getProductSupplier } from "../controllers/products/getproductbysupplier";

 //importing from controllers
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  getSupplier(req,res); 
  });

  //importing from controllers
  router.post("/reg", async (req: Request, res: Response) => {
    supplierRegistration(req,res);
  });

  router.post("/getprofile",verifyToken , (req: Request, res: Response) => {
    supplierProfile(req,res);
   });

   router.post("/getsupplierproducts",verifyToken , (req: Request, res: Response) => {
    getProductSupplier(req,res);
   });

  export default router;
