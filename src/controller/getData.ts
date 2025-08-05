import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Secret_key } from "../router/userRoute";
import { User } from "../model/user";
export const getData = async(req:Request,res:Response, next:NextFunction )=>{

    try{
    const auth = req.headers.authorization;
    if(!auth)
    {
        res.status(403).json({meassage:"Forbidden request"});
    }
    else{
 const token  = auth.split(' ')[1];
  // console.log(token);
    if(!token)
    {
        res.status(403).json({meassge: "token is required"});
    }
    const decoded = jwt.verify(token,Secret_key) as { role: string; [key: string]: any };
    console.log(decoded);
    const role = decoded.role;
    if(!role)
    {
       return res.status(403).json({meassge: "role not found"});
    }
    if (role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const data = await User.find();
    res.status(200).json(data);
    }
   
   
}
catch(err)
{
    res.status(500).json({err:"server error"});
}
}