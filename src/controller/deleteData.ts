import { Request, Response } from "express";
import { Student } from "../model/student";

export const deleteData = async(req:Request,res:Response)=>{
     try{
        const {id} = req.params;
        if(!id)
        {
             return res.status(403).json({err:"Id is not found"});
        }
        const data = await Student.findByIdAndDelete(id);
      res.status(200).json("Data Successfully Deleted");
}
    catch(err)
    {
        res.status(500).json({err: "something happen"});
    }

}