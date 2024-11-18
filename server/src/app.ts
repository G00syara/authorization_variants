import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import cors from '@koa/cors';
import simpleAuthRoutes from './routes/simpleAuthRoutes';
import protectedAuthRoutes from './routes/protectedAuthRoutes';

const app = new Koa();

app.use(cors());
app.use(logger());
app.use(json());
app.use(bodyParser());

app.use(simpleAuthRoutes.routes()).use(simpleAuthRoutes.allowedMethods());
app.use(protectedAuthRoutes.routes()).use(protectedAuthRoutes.allowedMethods());

export default app;
