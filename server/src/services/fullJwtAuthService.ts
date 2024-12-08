import { FullJwtUser } from '../db';

export namespace FullJwtAuthService {
  export const register = async (username: string, password: string) => {
    return await FullJwtUser.create({ username, password });
  };

  export const login = async (username: string, password: string) => {
    return await FullJwtUser.findOne({ where: { username, password } });
  };

  export const updateRefreshToken = async (userId: number, refreshToken: string) => {
    await FullJwtUser.update({ refreshToken }, { where: { id: userId } });
  };

  export const findByRefreshToken = async (refreshToken: string) => {
    return await FullJwtUser.findOne({ where: { refreshToken } });
  };
}
