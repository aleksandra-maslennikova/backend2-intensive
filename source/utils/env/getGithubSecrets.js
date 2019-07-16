import { ValidationError } from '../errors';

export const getGithubSecrets = () => {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

    if (!GITHUB_CLIENT_ID) {
        throw new ValidationError('Environment variable GITHUB_CLIENT_ID should be specified');
    }

    if (!GITHUB_CLIENT_SECRET) {
        throw new ValidationError('Environment variable GITHUB_CLIENT_SECRET should be specified');
    }

    return { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET };
};
