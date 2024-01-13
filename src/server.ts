
//inserting data via postman
import express, { Request, Response, NextFunction } from "express";
import sequelize from "./config/sequelize-config";
import EcSuppliers from "./models/ec_suppliers";
import supplierRouter from "./routes/supplierRoutes";
import customerRouter from "./routes/customerRoutes";
import login from "./routes/login";
import { firstExample } from "./middleware/middlewareExample";
import { secondExample } from "./middleware/middlewareExample";
import updatepasswordRouter from "./routes/resetPassword";
import sequelizeSync from "./services/sequelize";
import {connectToMongoDb, stopMongoDb } from "./services/mongodb";
import cors from "cors";
import { Server,Socket } from "socket.io"
import { createServer } from "http";
import { disconnect } from "process";
import { initializeSocket } from "./services/socket";




  sequelizeSync();
  connectToMongoDb();
  
  const app = express();
  //socketserver
  const server=createServer(app); //
   export const io=initializeSocket(server);
  // const io=new Server(server,{
  //   cors:{origin:'http://localhost:8080'},
  // });



  const port = process.env.PORT || 3000;
  app.use(cors());
  // Middleware to parse JSON requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  // Routes

  app.use((req,res,next)=>{
    console.log("hi from middleware");
    next();
  })

  app.use("/api/v1", supplierRouter); 
  app.use("/api/v2",customerRouter)
  app.use("/api/v3",login)
  app.use("/api/updatepassword",updatepasswordRouter)




  io.on('connection',(socket:Socket)=>{
    console.log('socket connected');
    console.log('socket is', socket);

    socket.emit('event emitted',"hello from backend")

    socket.on('event emitted',(result)=>{
      console.log(result);
    })

    socket.on('out of stock emit recieved',()=>{
      console.log('recieved frommfront end also')
    })

    socket.on('disconnect',()=>{
      console.log('user disconnnected');
    })

  })

  

//==============================================================================
//   interface CustomRequest extends Request {
//     customProperty?: object;
// };
 
// app.use((req: CustomRequest, res, next) => { //creating a custom property
//     firstExample(req,res,next);
// });
 
// app.use((req, res, next) => { //setting headers
//    secondExample(req,res,next)
// });


// app.get("/example",firstExample,secondExample, (req: CustomRequest, res: Response) => { //cookies and headers are sent to path /example only
//     console.log("Route Handler-Handling Request");
//     //access modified request property
//     const customProperty = req.customProperty ?? 'Not-available';

//     //sending modified response
//     res.send(customProperty);
// });
//===============================================================================
  
  // Start the server
  // app.listen(port, () => {
  //   console.log(`Server is running on port : ${port}`);
  // });
  server.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
  });
  

  //====================================

  //mongodb

  process.on("SIGINT",()=>{
    sequelize.close();stopMongoDb();
    process.exit();
  })

  process.on("exit",()=>{
    sequelize.close();stopMongoDb();
  })


  