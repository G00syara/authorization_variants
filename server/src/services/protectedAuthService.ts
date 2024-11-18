import bcrypt from 'bcrypt';
import { ProtectedUser } from '../db';

const SALT_ROUNDS = 10;

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