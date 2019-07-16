// Core
import { ExtractJwt } from 'passport-jwt';

// Instruments
import { getPassword } from '../env';

const key = getPassword();

export const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:    key,
};
