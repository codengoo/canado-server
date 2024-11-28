import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../data';
import UserModel from '../models/user.model';
import { handleExceptions, ResponseData } from '../utils';
import { AuthorizationError } from '../utils/error';
import { generateToken } from '../utils/jwt';
import { isNullOrEmpty } from '../validations/base.validation';

export default class AuthController {
  static async openDeepLink(req: Request, res: Response<ResponseData>) {
    // patch: Remove on production
    const id = req.query.id as string;

    await handleExceptions(res, async () => {
      // const user = req.user as IUser;

      // TODO: remove on product
      const user =
        (req.user as IUser) || (id && (await UserModel.getUserByID(id)));

      const { token, refresh } = generateToken(user);
      res.redirect(`nacado://auth?token=${token}&refresh=${refresh}`);
    });
  }

  static async writeCookie(req: Request, res: Response<ResponseData>) {
    // patch: Remove on production
    const id = req.query.id as string;

    await handleExceptions(res, async () => {
      // TODO: remove on product
      // const user = req.user as IUser;
      const user =
        (req.user as IUser) || (id && (await UserModel.getUserByID(id)));

      const { token, refresh } = generateToken(user);
      res.cookie('token', token);
      res.cookie('refresh', refresh);
      res.json({ message: 'Ok', data: { token, refresh } });
    });
  }

  static async failed(req: Request, res: Response<ResponseData>) {
    await handleExceptions(res, async () => {
      res.status(401).json({ message: 'Unauthorized' });
      throw new AuthorizationError();
    });
  }

  static async checkLogin(req: Request, res: Response<ResponseData>) {
    const { token } = req.cookies;

    await handleExceptions(res, async () => {
      if (isNullOrEmpty(token)) {
        throw new AuthorizationError();
      }

      try {
        const user = jwt.verify(token, process.env.JWT_TOKEN);
        res.json({ message: 'Ok', data: user });
      } catch (error) {
        throw new AuthorizationError();
      }
    });
  }
}
