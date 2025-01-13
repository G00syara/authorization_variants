import csrf from 'csrf';
import dotenv from 'dotenv';
import { Context } from 'koa';

import { CSRFAuthService } from '../services/csrfAuthService';

dotenv.config();

const csrfProtection = new csrf();
const CSRF_SECRET_KEY = process.env.CSRF_SECRET_KEY!;

export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username, password are required' };
    return;
  }

  const csrfToken = ctx.cookies.get('csrfToken');

  const isValid = csrfProtection.verify(CSRF_SECRET_KEY, csrfToken || '');
  if (!isValid && csrfToken) {
    ctx.status = 403;
    ctx.body = { error: 'Invalid CSRF token' };
    return;
  }

  try {
    const user = await CSRFAuthService.register(username, password);

    const newCsrfToken = csrfProtection.create(CSRF_SECRET_KEY);

    ctx.cookies.set('csrfToken', newCsrfToken, { httpOnly: false, sameSite: false });

    ctx.body = { message: 'User registered', user, csrfToken: newCsrfToken };
  } catch {
    ctx.status = 500;
    ctx.body = { error: 'User registration failed' };
  }
};

export const login = async (ctx: Context) => {
  const { username, password, csrfToken } = ctx.request.body as any;

  if (!username || !password || !csrfToken) {
    ctx.status = 400;
    ctx.body = { error: 'Username, password, and csrfToken are required' };
    return;
  }

  const isValid = csrfProtection.verify(CSRF_SECRET_KEY, ctx.cookies.get('csrfToken') || '');
  if (!isValid) {
    ctx.status = 403;
    ctx.body = { error: 'Invalid CSRF token' };
    return;
  }

  const user = await CSRFAuthService.login(username, password);

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  ctx.body = { message: 'Login successful' };
};

export const csrfToken = (ctx: Context) => {
  ctx.body = { message: 'This route use CSRF', csrfToken: ctx.cookies.get('csrfToken') };
};
