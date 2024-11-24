import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../data';
import { handleExceptions } from '../utils';
import ValidationError from '../utils/valError';

export default class AuthController {
  static async openDeepLink(req: Request, res: Response) {
    // patch: Remove on production
    const id = req.params.id;

    await handleExceptions(res, async () => {
      const user = (req.user as IUser) || { id };
      if (!user) throw new ValidationError('Invalid user');
      const token = jwt.sign({ sub: user.id }, process.env.JWT_TOKEN);
      const refresh = jwt.sign({ token }, process.env.JWT_REFRESH);
      res.redirect(`nacado://auth?token=${token}&refresh=${refresh}`);
    });
  }

  static async failed(req: Request, res: Response) {
    await handleExceptions(res, async () => {
      res.status(401).json({ message: 'Unauthorized' });
    });
  }
}
