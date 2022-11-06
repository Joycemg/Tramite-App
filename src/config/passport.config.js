import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import Account from '../schemas/auth.schema.js';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new Strategy(jwtOptions, async (payload, next) => {
  const { email, dni } = payload;
  const auth = await Account.findOne({ $or: [{ email }, { dni }] });
  if (auth) {
    next(null, auth);
  } else {
    next(null, false);
  }
});

passport.use(strategy);
