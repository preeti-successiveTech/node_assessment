import  express, { Request, Response }  from "express";
import mongoose, { Error } from "mongoose";
import studentRoute from "../router/studentRoute"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.get('/',(req:Request,res:Response)=>{
    res.send("Hello");
});
const mongoURI = process.env.Mongo_URI;
if(!mongoURI)
{
    throw new Error("Url is not found");
 }
mongoose.connect(mongoURI);

app.use('/student',studentRoute);

app.listen(3000,()=>{
    console.log("server is running at http://localhost:3000");
})