import { CSRFUser } from '../db';

export namespace CSRFAuthService {
  export const register = async (username: string, password: string) => {
    return await CSRFUser.create({ username, password });
  };

  export const login = async (username: string, password: string) => {
    return await CSRFUser.findOne({ where: { username, password } });
  };
}
