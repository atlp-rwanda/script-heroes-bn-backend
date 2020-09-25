import FacebookStrategy from 'passport-facebook';
import passport from 'passport';
import { User } from '../database/models';

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      profileFields: [
        'id',
        'name',
        'emails',
        'displayName',
        'picture.type(large)'
      ]
    },
    async (token, tokenSecret, profile, done) => {
      const query = { lastName: profile.name.familyName };
      const update = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        fbId: profile.id,
        email: undefined
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
