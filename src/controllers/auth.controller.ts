import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../data';
import UserModel from '../models/user.model';
import { handleExceptions } from '../utils';
import ValidationError from '../utils/valError';

export default class AuthController {
  static async openDeepLink(req: Request, res: Response) {
    // patch: Remove on production
    const id = req.query.id as string;

    await handleExceptions(res, async () => {
      // const user = req.user as IUser;
      
      // TODO: remove on product
      const user =
        (req.user as IUser) || (id && (await UserModel.getUserByID(id)));

      if (!user) throw new ValidationError('Invalid user');
      const token = jwt.sign(user, process.env.JWT_TOKEN);
      const refresh = jwt.sign(user, process.env.JWT_REFRESH);
      res.redirect(`nacado://auth?token=${token}&refresh=${refresh}`);
    });
  }

  static async failed(req: Request, res: Response) {
    await handleExceptions(res, async () => {
      res.status(401).json({ message: 'Unauthorized' });
    });
  }
}
