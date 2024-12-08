import Router from 'koa-router';

import * as fullJwtAuthController from '../controllers/fullJwtAuthController';

const router = new Router();

router.prefix('/full_jwt');

router.post('/register', fullJwtAuthController.register);
router.post('/login', fullJwtAuthController.login);
router.post('/refresh', fullJwtAuthController.refresh);
router.get('/check_token', fullJwtAuthController.checkToken);

export default router;
