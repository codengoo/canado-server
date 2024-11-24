import { Request, Response } from 'express';

export default class AuthController {
  static async openDeepLink(req: Request, res: Response) {
    res.json({ data: req.user });
  }

  
}
