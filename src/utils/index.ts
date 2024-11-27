import { Response } from 'express';
import { AuthorizationError, ValidationError } from './error';

export async function handleExceptions(
  res: Response<ResponseData>,
  func: () => Promise<void>,
) {
  try {
    await func();
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        message: error.message,
        data: null,
      });
    } else if (error instanceof AuthorizationError) {
      res.status(401).json({
        message: error.message,
        data: null,
      });
    } else {
      console.log(error);
      res.status(500).json({
        message: 'Unknown error',
        data: null,
      });
    }
  }
}

export interface ResponseData<T = any> {
  message: string;
  data?: T;
  errors?: string[];
}
