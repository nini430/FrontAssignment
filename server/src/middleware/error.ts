import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/ErrorResponse';

const errorHandler = (err: ErrorResponse, req: Request, res: Response,next:NextFunction) => {
  const error = { ...err };
  error.message = err.message;

  return res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || 'Something went wrong' });
};

export default errorHandler;