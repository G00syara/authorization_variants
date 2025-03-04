import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cookie from 'koa-cookie';
import json from 'koa-json';
import logger from 'koa-logger';

import csrfAuthRoutes from './routes/csrfAuthRoutes';
import fullJwtAuthRoutes from './routes/fullJwtAuthRoutes';
import jwtAuthRoutes from './routes/jwtAuthRoutes';
import protectedAuthRoutes from './routes/protectedAuthRoutes';
import simpleAuthRoutes from './routes/simpleAuthRoutes';
import webAuthRoutes from './routes/webAuthRoutes';

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
app.use(fullJwtAuthRoutes.routes()).use(fullJwtAuthRoutes.allowedMethods());
app.use(csrfAuthRoutes.routes()).use(csrfAuthRoutes.allowedMethods());
app.use(webAuthRoutes.routes()).use(webAuthRoutes.allowedMethods());

export default app;
