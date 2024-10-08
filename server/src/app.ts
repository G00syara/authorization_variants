import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import jwt from 'jsonwebtoken';
import { ProtectedUser, User } from './db';
import cors from '@koa/cors';
import bcrypt from 'bcrypt';

const app = new Koa();
const router = new Router();
const SECRET_KEY = 'your_secret_key';
const SALT_ROUNDS = 10; 

app.use(cors()); 
app.use(logger());
app.use(json());
app.use(bodyParser());

interface AuthRequest {
  username: string;
  password: string;
}

router.post('/SimpleRegister', async (ctx) => {
  const { username, password }: AuthRequest = ctx.request.body as AuthRequest;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username and password are required' };
    return;
  }

  try {
    const user = await User.create({ username, password });
    ctx.body = { message: 'User registered', user };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'User registration failed' };
  }
});

router.post('/SimpleLogin', async (ctx) => {
  const { username, password }: AuthRequest = ctx.request.body as AuthRequest;

  const user = await User.findOne({ where: { username, password } });

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  ctx.body = { message: 'SimpleLogin successful', token };
});

router.post('/ProtectedRegister', async (ctx) => {
  const { username, password }: AuthRequest = ctx.request.body as AuthRequest;

  if (!username || !password) {
    ctx.status = 400;
    ctx.body = { error: 'Username and password are required' };
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await ProtectedUser.create({ username, password: hashedPassword });
    ctx.body = { message: 'User registered', user };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'User registration failed' };
  }
});

router.post('/ProtectedLogin', async (ctx) => {
  const { username, password }: AuthRequest = ctx.request.body as AuthRequest;

  const user = await ProtectedUser.findOne({ where: { username } });

  if (!user) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    ctx.status = 401;
    ctx.body = { error: 'Invalid credentials' };
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  ctx.body = { message: 'Login successful', token };
});


app.use(router.routes()).use(router.allowedMethods());

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
