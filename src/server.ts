// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("welcome");
// });

// app.listen(port, () => {
//   console.log("Server is running on port", port);
// });

//----------------------------------------------------------------


// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   const { name, age } = req.query;
//   res.send(`${name},${age}`);
// });

// app.listen(port, () => {
//   console.log("Server is running on port", port);
// });


//----------------------------------------------------------------

//inserting data via postman
import express, { Request, Response } from "express";
import sequelize from "./config/sequelize-config";
import EcSuppliers from "./models/ec_suppliers";
import router from "./routes/supplierRoutes";
import customerRouter from "./routes/customerRoutes";
import login from "./routes/login";

// Sync the model with the database to create the table
sequelize.sync().then(() => {
  console.log("Table synced successfully");

  const app = express();
  const port = process.env.PORT || 3000;

  // Middleware to parse JSON requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes

  app.use("/api/v1", router); 
  app.use("/api/v1",router)
  app.use("/api/v2",customerRouter)
  app.use("/api/v2",customerRouter)
  app.use("/api/v3",login)
 

  // app.get("/", async (req: Request, res: Response) => {
  //   const found = await EcSuppliers.findOne({
  //     where: { e_mail: "john.doe@example.com" },
  //   });
  
  //   // Check if a record is found
  //   if (found) {
  //     res.status(200).json({
  //       message: "Data retrieved successfully",
  //       data: found,
  //     });
  //   } else {
  //     res.status(404).json({
  //       message: "Data not found",
  //     });
  //   }
  // });
  
  

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});





//-----------------------------------------



// sequelize
//   .sync({ force: false }) // Set force to true to drop and recreate tables on every application start
//   .then(() => {
//     console.log("Database synced");
//   })
//   .catch((error) => {
//     console.error("Error syncing database:", error);
//   });


//   const insertTrial = async () => {
//   const created = await EcSuppliers.create({
//     full_name: "Geevarghese",
//     e_mail: "gv@gmail.com",
//     password:"hello",

//   });
//   console.log("created is", created);
// };
// insertTrial();
