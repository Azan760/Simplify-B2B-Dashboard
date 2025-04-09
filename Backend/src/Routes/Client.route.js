import {Router} from 'express';
import { SalesPerson, Client } from '../Controller/NewClient.controller.js';



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(Client);


export default router;





