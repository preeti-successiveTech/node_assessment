import { Request, Response } from "express";
import { Student } from "../model/student";

export const update = async(req:Request,res:Response)=>{
      try{
        const {id} = req.params;
        const {name} = req.body;
        if(!id)
        {
             return res.status(403).json({err:"Id is not found"});
        }
        const data = await Student.findByIdAndUpdate(id, {name:{name}},{new: true});
      res.status(201).json(data);
}
    catch(err)
    {
        res.status(500).json({err: "something happen"});
    }

}