import EcCustomers from "../../models/ec_customers";
// import EcCustomers from "../../types/modelTypes/ec_customers";
import { Request,Response } from "express";
import crypto from 'crypto'
import EcSuppliers from "../../models/ec_suppliers";

//customer view
const supplierProfile = async (req: Request, res: Response): Promise<void> => {
    const {  e_mail, } = req.body;
   
    const found = await EcSuppliers.findOne({
      where: { e_mail },attributes:['e_mail','full_name'],
      raw: true,
    });
    console.log(found);
   
    res.send(found);
    //   return found;
  };
  export default supplierProfile;