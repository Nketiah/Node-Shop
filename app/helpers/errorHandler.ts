import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors"

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occurred"
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  } else if (error instanceof Error) {
    errorMessage = error.message
  }

  next(res.status(statusCode).json({ message: errorMessage }))
}
