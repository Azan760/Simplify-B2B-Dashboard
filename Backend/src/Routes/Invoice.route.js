import {Router} from 'express';
import { getClients } from "../Controller/NewSaleInvoice.controller.js";



const router = Router();
router.route('/si/new').get(getClients);
// router.route('/new').post(Client);


export default router;





