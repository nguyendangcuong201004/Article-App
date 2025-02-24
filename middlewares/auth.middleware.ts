import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const requireAuth  = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.headers.authorization){
        const token = req.headers.authorization;
        const user = await User.find({
            token: token,
            deleted: false,
        }).select("-password")
        if (user){
            req["token"] = token;
        }
    }

    next()    
}