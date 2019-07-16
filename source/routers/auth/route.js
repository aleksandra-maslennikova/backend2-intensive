// Core
import dg from 'debug';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Instruments
import { getPassword } from '../../utils';

const debug = dg('router:auth');

const sign = promisify(jwt.sign);
const key = getPassword();

export const login = async (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        const token = await sign({ email: 'jdoe@lectrum.io' }, key);

        res.header('X-Token', token);
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    debug(`${req.method} - ${req.originalUrl}`);

    try {
        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
