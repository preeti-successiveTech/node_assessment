import { Request, Response, Router } from "express";
import { validate } from "../Middleware/validationMiddleware";
import { Student } from "../models/student";
import {auth} from "../Middleware/authMiddleware";
import jwt from 'jsonwebtoken';
interface jwtPayload{
    name: string,
    email : string,
    password : string
}

declare global
{namespace express{
        interface Request{
            user: string
        }
    }
}
const router = Router();
router.get("/",async(req:Request,res:Response)=>{
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

});

router.post('/',async(req:Request,res:Response)=>{
    try{
    const {name,age,grade,email} = req.body;
    const valid = validate.schema({name,age,grade,email});
    console.log(valid);
    if(!valid)
    {
        return res.status(403).json({err:"Please enter valid details"});
    }
     await Student.create({name,age,grade,email});
    res.status(201).json("Data is successfully inserted");
}
    catch(err)
    {
        res.status(500).json({err: "something happen"});
    }

});



router.get("/:id",async(req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        if(!id)
        {
             return res.status(403).json({err:"Id is not found"});
        }
        const data = await Student.findById(id);
      res.status(200).json(data);
}
    catch(err)
    {
        res.status(500).json({err: "something happen"});
    }

});





router.put("/:id",async(req:Request,res:Response)=>{
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

});




router.delete("/:id",async(req:Request,res:Response)=>{
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

});




router.get("/?minAge= 20 & maxAge= 30",(req:Request,res:Response)=>{


});

const key = process.env.Secret_key;
        if(!key)
        {
           throw new Error("Key is required");
        }

router.post('/registration',(req:Request, res:Response)=>{
    const {name,email, password} = req.body;
    if(!name || !email ||!password)
        {
            res.status(203).json({err:"name, email and password is required"});
        } 
    const token = jwt.sign({name,email,password},key, {expiresIn:'1h'});




});

router.get('/login',auth.authMiddle,(req:Request, res: Response)=>{
    const {name, password} = req.body;
      if(!name || !password)
        {
            res.status(203).json({err:"name, email and password is required"});
        }
    
    
    

})

export default router;

