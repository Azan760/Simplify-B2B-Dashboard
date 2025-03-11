import {Router} from 'express';
import {Login, Logout} from '../Controller/Login.controller.js';
import {verifyToken} from '../Middlewares/auth.middlewares.js';


const router = Router();


router.route('/login').post(Login);
router.route('/logout').post(verifyToken, Logout);

export default router;
