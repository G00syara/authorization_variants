import { User } from '../db';

export namespace SimpleAuthService {
    export  const register = async (username: string, password: string) => {
        return await User.create({ username, password });
      };
      
      export const login = async (username: string, password: string) => {
        return await User.findOne({ where: { username, password } });
      };
      
}
