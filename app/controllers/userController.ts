import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma";
import { sendCookieToken } from "../helpers/cookieToken"
import createError from "http-errors"
import { Response } from "express"


export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
     return next(createError(400, "All Fields are Required"))
  }

  const user = await prisma.user.create({
    data: { name, email, password },
    select: {
      id: true,
      name: true,
      email: true,
    },
  })

  sendCookieToken(user, res)
})


export const userLogin = asyncHandler (async (req, res, next) => {
   const {email, password} = req.body
   if(!email || !password) {
     return next(createError(400, "All Fields are Required"))
   }
     const user = await prisma.user.findUnique({
      where: {email}
     })

   if(!user){
      return next(createError(400, "Wrong password"))
   }

   sendCookieToken(user, res)
})

export const logout = asyncHandler ( async(req, res) =>{
   res.clearCookie("token")
   res.status(200).json({success: true})
})
