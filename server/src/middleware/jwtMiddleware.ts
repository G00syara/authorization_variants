import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

export const jwtMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('jwt_token') || ctx.headers['authorization']?.split(' ')[1];

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Token missing' };
    return;
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    ctx.state.user = payload;
    await next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    ctx.status = 403;
    ctx.body = { error: 'Invalid or expired token' };
  }
};
