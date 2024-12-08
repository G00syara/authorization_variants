import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

const SECRET_KEY = process.env.SECRET_KEY!;

export const authMiddleware = async (ctx: Context, next: Next) => {
  const accessToken = ctx.cookies.get('accessToken');

  if (!accessToken) {
    ctx.status = 401;
    ctx.body = { error: 'Токен отсутствует' };
    return;
  }

  try {
    const payload = jwt.verify(accessToken, SECRET_KEY) as any;
    ctx.state.user = payload;
    await next();
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    ctx.status = 403;
    ctx.body = { error: 'Недействительный токен' };
  }
};
