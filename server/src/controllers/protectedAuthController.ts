import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import {ProtectedAuthService} from '../services/protectedAuthService';

const SECRET_KEY = 'your_secret_key';

export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username and password are required' };
    return;
  }

  try {
    const user = await ProtectedAuthService.register(username, password);
    ctx.body = { message: 'User registered', user };
  } catch {
    ctx.status = 500;
    ctx.body = { error: 'User registration failed' };
  }
};

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  const user = await ProtectedAuthService.login(username, password);

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  ctx.body = { message: 'Login successful', token };
};
