import Router from 'express';

import controller from './authController.js';
import { validate } from '../../middlewares/validate.js';
import { loginRules, registrationRules } from '../../middlewares/validators/auth.js';


const router = new Router();

router.post('/registration', validate(registrationRules), controller.registration);
router.post('/login', validate(loginRules), controller.login);
router.get('/users', controller.getUsers);

export default router;