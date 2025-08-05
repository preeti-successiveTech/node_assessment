import mongoose from "mongoose";


const mongoURI = process.env.Mongo_URI;
if(!mongoURI)
{
    throw new Error("Url is not found");
}
mongoose.connect(mongoURI);
