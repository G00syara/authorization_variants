import Router from 'koa-router';
import * as simpleAuthController from '../controllers/simpleAuthController';

const router = new Router();

router.prefix('/simple');

router.post('/register', simpleAuthController.register);
router.post('/login', simpleAuthController.login);

export default router;
