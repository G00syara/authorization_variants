import { JWTUser } from '../db';

export namespace JWTAuthService {
  export const register = async (username: string, password: string) => {
    return await JWTUser.create({ username, password });
  };

  export const login = async (username: string, password: string) => {
    return await JWTUser.findOne({ where: { username, password } });
  };
}
