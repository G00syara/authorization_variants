import Router from 'koa-router';

import * as jwtAuthController from '../controllers/jwtAuthController';
import { jwtMiddleware } from '../middleware/jwtMiddleware';

const router = new Router();

router.prefix('/jwt');

router.post('/register', jwtAuthController.register);
router.post('/login', jwtAuthController.login);

router.get('/check_jwt', jwtMiddleware, jwtAuthController.checkJWT);

export default router;
