import { Request, Response } from "express";
import { Student } from "../model/student";

export const data = async(req:Request,res:Response)=>{
    try{
        const data = await Student.find();
        if(!data)
        {
            return res.status(403).json({err:"Data is not found"});
        }
        res.status(200).json(data);
    }
    catch(err)
    {
        res.status(500).json({err: "something happen"});
    }

};