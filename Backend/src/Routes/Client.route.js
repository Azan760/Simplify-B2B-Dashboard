import {Router} from 'express';
import { SalesPerson, Client, ClientList, detailView } from '../Controller/Client.controller.js';



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(Client);
router.route('/list').get(ClientList);
router.route('/list/:id').get(detailView);





export default router;





