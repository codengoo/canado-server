import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { handleExceptions } from '../utils';
import { AuthorizationError } from '../utils/error';

export default async function checkJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { token } = req.cookies;

  await handleExceptions(res, async () => {
    if (!token) throw new AuthorizationError();

    try {
      req.user = jwt.verify(token, process.env.JWT_TOKEN);

      next();
    } catch (error) {
      throw new AuthorizationError();
    }
  });
}
