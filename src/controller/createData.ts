import { Request, Response } from "express";
import { Student } from "../model/student";
import { validate } from "../middleware/validateMiddleware";

export const createData = async (req: Request, res: Response) => {
  try {
    const { name, age, grade, email } = req.body;
    const { error } = validate.validate({ name, age, grade, email });

    if (error) {
      return res.status(400).json({ err: error.details[0].message });
    }

    await Student.create({ name, age, grade, email });

    res.status(201).json({ message: "Data is successfully inserted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};
