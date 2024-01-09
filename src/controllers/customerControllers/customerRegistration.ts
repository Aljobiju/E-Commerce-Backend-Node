import EcCustomers from "../../types/modelTypes/ec_customers";
import { Request,Response } from "express";
import crypto from 'crypto'

//function for encryption
const hashPassword = (password: string): string => {
  // Create a hash object with the 'sha256' algorithm
  const hash = crypto.createHash('sha256');

  // Update the hash object with the password
  hash.update(password);

  // Get the hashed password in hexadecimal format
  const hashedPassword = hash.digest('hex');

  return hashedPassword;
};

//function
const customerRegistration =async (req:Request,res:Response) : Promise<void> => {
try {
    const { full_name, e_mail, password, profile_pic } = req.body;

    const hashedPassword = hashPassword(password);
    // Create a new EcSuppliers record
    const newCustomer = await EcCustomers.create({
      full_name,
      e_mail,
      password: hashedPassword,
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
}


//function
const customerGet = async(req:Request,res:Response): Promise<void> => {
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
}

export {customerGet};
export default customerRegistration;


