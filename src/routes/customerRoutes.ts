import express, { Request, Response, Router } from "express";
import sequelize from "../config/sequelize-config";
import EcCustomers from "../models/ec_customers";



const customerRouter = express.Router();
customerRouter.get("/", async (req: Request, res: Response) => {
    const found = await EcCustomers.findOne({
      where: { e_mail: "john.doe@example.com" },
    });
  
    // Check if a record is found
    if (found) {
      res.status(200).json({
        message: "Data retrieved successfully",
        data: found,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
      });
    }
  });

  customerRouter.post("/", async (req: Request, res: Response) => {
    try {
      const { full_name, e_mail, password, profile_pic } = req.body;

      // Create a new EcSuppliers record
      const newCustomer = await EcCustomers.create({
        full_name,
        e_mail,
        password,
        profile_pic: Buffer.from(profile_pic),
      });

      res.status(200).json({
        message: "Data inserted successfully",
        data: newCustomer.toJSON(),
      });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  });

  export default customerRouter;
