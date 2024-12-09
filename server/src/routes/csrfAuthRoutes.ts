import Router from 'koa-router';

import * as csrfAuthController from '../controllers/csrfAuthController';

const router = new Router();

router.prefix('/csrf');

router.get('/csrf_token', csrfAuthController.csrfToken);
router.post('/register', csrfAuthController.register);
router.post('/login', csrfAuthController.login);

export default router;
