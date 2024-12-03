import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';

import { JWTAuthService } from '../services/jwtAuthService';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;
  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username and password are required' };
    return;
  }

  try {
    const user = await JWTAuthService.register(username, password);
    ctx.body = { message: 'User registered', user };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'User registration failed' };
  }
};

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  const user = await JWTAuthService.login(username, password);

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  ctx.cookies.set('jwt_token', token, {
    httpOnly: true,
    maxAge: 36000000,
    sameSite: false,
    secure: false,
  });

  ctx.body = { message: 'Login successful', token };
};

export const checkJWT = async (ctx: Context) => {
  ctx.body = { message: 'This route use JWT', user: ctx.state.user };
};
