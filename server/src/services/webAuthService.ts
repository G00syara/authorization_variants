import { WebAuth } from '../db';

export namespace WebAuthService {
  export const getUserByEmail = async (email: string) => {
    return await WebAuth.findOne({ where: { email } });
  };

  export const getUserById = async (id: string) => {
    return await WebAuth.findOne({ where: { credentialID: id } });
  };

  export const createUser = async (username: string, email: string, anyProps: any) => {
    return await WebAuth.create({ username, email, ...anyProps });
  };

  export const updateUserCounter = async (username: string, counter: number) => {
    return await WebAuth.update({ counter: counter }, { where: { username } });
  };
}
