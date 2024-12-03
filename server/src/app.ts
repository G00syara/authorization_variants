import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cookie from 'koa-cookie';
import json from 'koa-json';
import logger from 'koa-logger';

import jwtAuthRoutes from './routes/jwtAuthRoutes';
import protectedAuthRoutes from './routes/protectedAuthRoutes';
import simpleAuthRoutes from './routes/simpleAuthRoutes';

const app = new Koa();

app.use(cookie());
app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);
app.use(logger());
app.use(json());
app.use(bodyParser());

app.use(simpleAuthRoutes.routes()).use(simpleAuthRoutes.allowedMethods());
app.use(protectedAuthRoutes.routes()).use(protectedAuthRoutes.allowedMethods());
app.use(jwtAuthRoutes.routes()).use(jwtAuthRoutes.allowedMethods());

export default app;
