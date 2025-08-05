import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class Auth {
  public static authMiddle() {
    return (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ err: "Token is required" });
      }

      const key = process.env.Secret_key;
      if (!key) {
        return res.status(403).json({ err: "Key is required" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(403).json({ err: "Token is malformed" });
      }

      jwt.verify(token, key, (err, decoded) => {
        if (err) {
          return res.status(401).json({ err: "Invalid token" });
        }
        (req as any).user = decoded;
        next();
      });
    };
  }
}