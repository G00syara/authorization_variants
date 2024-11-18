import Router from 'koa-router';
import * as ProtectedAuthController from '../controllers/protectedAuthController';

const router = new Router();

router.prefix('/protected');

router.post('/register', ProtectedAuthController.register);
router.post('/login', ProtectedAuthController.login);

export default router;
