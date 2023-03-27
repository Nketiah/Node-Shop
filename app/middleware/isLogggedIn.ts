import { prisma } from "../../prisma"
import jwt  from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"


const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {

     try {
        const token = req.cookies().get('token')
     } catch (error) {
        
     }
}