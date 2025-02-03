import { Context } from 'koa';

import { SimpleAuthService } from '../services/simpleAuthService';

export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username and password are required' };
    return;
  }

  try {
    const user = await SimpleAuthService.register(username, password);
    ctx.body = { message: 'User registered', user };
  } catch {
    ctx.status = 500;
    ctx.body = { error: 'User registration failed' };
  }
};

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  const user = await SimpleAuthService.login(username, password);

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  ctx.body = { message: 'Login successful' };
};
