import { NextFunction, Request, Response} from "express";
import {jwt} from "jsonwebtoken"

export class auth {
    public static authMiddle():any
    {
        return(req:Request, res:Response, next:NextFunction)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader)
        {
            return res.status(403).json({err:"Token is required"});
        }
        const key = process.env.Secret_key;
        if(!key)
        {
           return  res.status(403).json({err:"Key is required"});
        }
        const token = authHeader.split(' ')[1];
         jwt.verify(token, key,(err,user)=>{
            if(err)
            {
                res.status(500).json("Something happend");
            }
            req.user = user;
        });
        next();
    }
    }
}