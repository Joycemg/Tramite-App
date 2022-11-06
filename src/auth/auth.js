import passport from 'passport';
import * as localStrategy from 'passport-local';
import Account from '../schemas/auth.schema.js';

passport.use(
  'signup',
  new localStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);
