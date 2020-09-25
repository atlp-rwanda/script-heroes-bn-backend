import strategy from 'passport-google-oauth';
import passport from 'passport';
import { User } from '../database/models';

const GoogleStrategy = strategy.OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (token, tokenSecret, profile, done) => {
      const query = { email: profile.emails[0].value };
      const update = {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        phoneNumber: null
      };
      const [user, created] = await User.findOrCreate({
        where: query,
        defaults: update
      });
      if (created) return done(null, user);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

export default passport;
