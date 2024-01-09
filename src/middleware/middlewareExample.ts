import { NextFunction,Request,Response } from "express";

interface CustomRequest extends Request {
    customProperty?: object;
};

export const firstExample=(req:CustomRequest,res:Response,next:NextFunction)=>{
req.customProperty = ({ message: 'hello' });
    next();
}

export const secondExample=(req:CustomRequest,res:Response,next:NextFunction)=>{
res.setHeader('Content-type', 'application/json');
res.setHeader('Set-cookie', ['type=ninja', 'language=javascript']);
next();
}
