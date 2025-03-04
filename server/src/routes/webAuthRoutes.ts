import Router from 'koa-router';

import * as webAuthController from '../controllers/webAuthController';

const router = new Router();

router.prefix('/webAuth');

router.post('/generate-registration-options', webAuthController.generateRegistary);
router.post('/verify-registration', webAuthController.verifyRegistary);
router.post('/init-auth', webAuthController.initAuth);
router.post('/verify-auth', webAuthController.verifyLogin);

export default router;
