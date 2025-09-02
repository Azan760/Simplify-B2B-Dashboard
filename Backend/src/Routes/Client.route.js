import {Router} from 'express';
import { SalesPerson, Client, ClientList, detailView,editView } from '../Controller/Client.controller.js';



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(Client);
router.route('/list').get(ClientList);
router.route('/view/:id').get(detailView);
router.route('/edit/:id').put(editView);





export default router;





