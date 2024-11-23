import { Response } from 'express';
import ValidationError from './valError';

export async function handleExceptions(
  res: Response,
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
    } else {
      console.log(error);
      res.status(500).json({
        message: 'Unknown error',
        data: null,
      });
    }
  }
}
