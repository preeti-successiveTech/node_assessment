
import { Request, Response, Router } from "express";
import { validate } from "../middleware/validateMiddleware";
import { Student } from "../model/student";
import {Auth} from "../middleware/authMiddleware";
import jwt from 'jsonwebtoken';
import { data } from "../controller/data";
import { createData } from "../controller/createData";
import { getDataById } from "../controller/getDataById";
import { deleteData } from "../controller/deleteData";

const router = Router();
router.get("/",data);
router.post('/',createData);
router.get("/:id",getDataById);
router.put("/:id",createData);
router.delete("/:id",deleteData);



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
    res.status(200).json(token);
});

router.get('/login',Auth.authMiddle,(req:Request, res: Response)=>{
    const {name, password} = req.body;
      if(!name || !password)
        {
            res.status(203).json({err:"name, email and password is required"});
        }
    
    

})

export default router;
