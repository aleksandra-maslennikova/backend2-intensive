// Core
import passport from 'passport';

export const authenticate = passport.authenticate('github', { scope: [ 'user:email' ] });
