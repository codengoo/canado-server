import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../models/user.model';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: '/auth/google/redirect',   
      callbackURL: 'http://api.nacado.nghiacangao.io.vn/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { sub, name, picture, email } = profile._json;
      var user = await UserModel.getUserByID(sub);

      user = !user
        ? await UserModel.createUser({
            avatar: picture,
            displayName: name,
            email,
            sub,
          })
        : await UserModel.updateAvatar(sub, picture);

      return cb(null, user);
    },
  ),
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

export default passport;
