import { Router } from 'express';
import passport from '../configs/passport';
import AuthController from '../controllers/auth.controller';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/google/redirect',
  passport.authenticate('google', {
    successReturnToOrRedirect: '/auth/success/deeplink',
    failureRedirect: '/auth/failure',
  }),
);

router.get('/success/deeplink', AuthController.openDeepLink);
router.get('/failure', AuthController.openDeepLink);

export default router;
