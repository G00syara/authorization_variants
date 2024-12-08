import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Context } from 'koa';

import { FullJwtAuthService } from '../services/fullJwtAuthService';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;
const ACCESS_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

const generateAccessToken = (user: any) =>
  jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: ACCESS_EXPIRES_IN,
  });

const generateRefreshToken = (user: any) =>
  jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: REFRESH_EXPIRES_IN,
  });

export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username и пароль обязательны' };
    return;
  }

  try {
    const user = await FullJwtAuthService.register(username, password);
    ctx.body = { message: 'Пользователь зарегистрирован', user };
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    ctx.status = 500;
    ctx.body = { error: 'Ошибка регистрации' };
  }
};

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as any;

  const user = await FullJwtAuthService.login(username, password);
  if (!user) {
    ctx.status = 401;
    ctx.body = { error: 'Неверные учетные данные' };
    return;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await FullJwtAuthService.updateRefreshToken(user.id, refreshToken);

  ctx.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: 'strict',
    secure: false,
  });

  ctx.body = { message: 'Авторизация успешна', refreshToken };
};

export const refresh = async (ctx: Context) => {
  const { refreshToken } = ctx.request.body as any;

  if (!refreshToken) {
    ctx.status = 401;
    ctx.body = { error: 'Refresh токен отсутствует' };
    return;
  }

  try {
    const payload = jwt.verify(refreshToken, SECRET_KEY) as any;

    const user = await FullJwtAuthService.findByRefreshToken(refreshToken);

    if (!user || user.id !== payload.id) {
      ctx.status = 403;
      ctx.body = { error: 'Неверный refresh токен' };
      return;
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await FullJwtAuthService.updateRefreshToken(user.id, newRefreshToken);

    ctx.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: 'strict',
      secure: false,
    });

    ctx.body = { refreshToken: newRefreshToken };
  } catch (error) {
    console.error('Ошибка обновления токена:', error);
    ctx.status = 403;
    ctx.body = { error: 'Недействительный токен' };
  }
};

export const checkToken = async (ctx: Context) => {
  const accessToken = ctx.cookies.get('accessToken');

  if (!accessToken) {
    ctx.status = 401;
    ctx.body = { error: 'Access токен отсутствует' };
    return;
  }

  try {
    const payload = jwt.verify(accessToken, SECRET_KEY) as any;
    ctx.status = 200;
    ctx.body = { message: 'Токен действителен', user: payload };
  } catch (error) {
    console.error('Ошибка проверки токена:', error);
    ctx.status = 403;
    ctx.body = { error: 'Токен недействителен или истёк' };
  }
};
