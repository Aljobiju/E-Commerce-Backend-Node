
//inserting data via postman
import express, { Request, Response, NextFunction } from "express";
import sequelize from "./config/sequelize-config";
import EcSuppliers from "./models/ec_suppliers";
import router from "./routes/supplierRoutes";
import customerRouter from "./routes/customerRoutes";
import login from "./routes/login";
import { firstExample } from "./middleware/middlewareExample";
import { secondExample } from "./middleware/middlewareExample";
import updatepasswordRouter from "./routes/resetPassword";
import sequelizeSync from "./services/sequelize";
import {connectToMongoDb, stopMongoDb } from "./services/mongodb";


  sequelizeSync();
  connectToMongoDb();
  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware to parse JSON requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  // Routes

  app.use((req,res,next)=>{
    console.log("hi from middleware");
    next();
  })

  app.use("/api/v1", router); 
  app.use("/api/v2",customerRouter)
  app.use("/api/v3",login)
  app.use("/api/updatepassword",updatepasswordRouter)
//==============================================================================
  interface CustomRequest extends Request {
    customProperty?: object;
};
 
// app.use((req: CustomRequest, res, next) => { //creating a custom property
//     firstExample(req,res,next);
// });
 
// app.use((req, res, next) => { //setting headers
//    secondExample(req,res,next)
// });


app.get("/example",firstExample,secondExample, (req: CustomRequest, res: Response) => { //cookies and headers are sent to path /example only
    console.log("Route Handler-Handling Request");
    //access modified request property
    const customProperty = req.customProperty ?? 'Not-available';

    //sending modified response
    res.send(customProperty);
});
//===============================================================================
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });

  //====================================

  //mongodb

  process.on("SIGINT",()=>{
    sequelize.close();stopMongoDb();
  })

  process.on("exit",()=>{
    sequelize.close();stopMongoDb();
  })


