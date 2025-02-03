import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

import { ProtectedUser } from '../db';

dotenv.config();

const SALT_ROUNDS = process.env.SALT_ROUNDS!;

export namespace ProtectedAuthService {
  export const register = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return await ProtectedUser.create({ username, password: hashedPassword });
  };

  export const login = async (username: string, password: string) => {
    const user = await ProtectedUser.findOne({ where: { username } });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  };
}
