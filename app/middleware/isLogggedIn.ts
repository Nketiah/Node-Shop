import { prisma } from "../../prisma"
const asyncHandler = require("express-async-handler")
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"



export const isLoggedIn = async (req: any, res: Response, next: NextFunction) => {

    try {
        const token = req.cookies.token
        if (!token) {
            return next(createHttpError(401, "Not authorized to access this route"))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })

        next()
    } catch (error) {
        return next(createHttpError(401, "Not authorized to access this route"))
    }

}