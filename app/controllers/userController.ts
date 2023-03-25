import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma";
import { sendCookieToken } from "../helpers/cookieToken"
import createError from "http-errors"


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
