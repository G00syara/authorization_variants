import { Context } from 'koa';

import { ProtectedAuthService } from '../services/protectedAuthService';

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

  ctx.body = { message: 'Login successful' };
};
