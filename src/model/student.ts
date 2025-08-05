
import { required } from "joi";
import mongoose, { Schema } from "mongoose";

export interface student{
      name: string;
  age: number;
  grade: string;
  email: string;
  createdAt: Date;

}
const studentSchema : Schema = new Schema({
    name:{
        type:String,
        required: true,
    },
    age:{
        type:Number,
        required:true,
        minAge : 10,
        maxAge : 40
    },
    grade:{
        type:String,
        required : true,
    },
    email:{
        type:String,
        required : true,
        unique: true

    }
},{timestamps: true});

export const Student = mongoose.model<student>('Student',studentSchema);
