import EcSuppliers from "../../models/ec_suppliers";
import { Response,Request } from "express";
import crypto from 'crypto';
import AWS from 'aws-sdk';
import { Readable } from "stream";
import { ManagedUpload } from "aws-sdk/clients/s3";


// const s3= new AWS.S3({
//   accessKeyId : 'AKIA5IOGN2NXNVX6UNHV',
//  secretAccessKey : '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'
// })


//function
const supplierRegistration = async (req: Request, res: Response): Promise<void> => {
try {
    const { full_name, e_mail, password, profile_pic } = req.body;

    // const file = req?.file as Express.Multer.File; //file into s3
    // const params: AWS.S3.PutObjectRequest = {
    //   Bucket: 'ecommercebucket1',
    //   Key: file?.originalname,
    //   Body: Readable.from(file?.buffer),
    //   ContentType: file?.mimetype,
    // };


  //   s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
  //     if (err) {
  //       // reject(err);
  //       console.log(err)
  //     } else {
  //       // resolve(data);
  //       console.log(data)
  //     }
  //   });
  // console.log(req.file);
    const hashedPassword = hashPassword(password);
    // Create a new EcSuppliers record
    const newSupplier = await EcSuppliers.create({
      full_name,
      e_mail,
      password: hashedPassword,
      profile_pic: Buffer.from(profile_pic),
    });

    res.status(200).json({
      message: "Data inserted successfully",
      data: newSupplier.toJSON(),
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({
      error: "Server Error",
    });
  }
}


//function
const getSupplier = async (req: Request, res: Response): Promise<void> => {
const found = await EcSuppliers.findOne({
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

export {getSupplier};
export default supplierRegistration;