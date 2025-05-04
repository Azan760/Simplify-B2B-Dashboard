import {Router} from 'express';
import { getClients,getProducts,NewSaleInvoice } from "../Controller/SaleInvoice.controller.js";



const router = Router();
router.route('/si/new').get(getClients);
router.route('/si/new/products').get(getProducts);
router.route('/si/new').post(NewSaleInvoice);


export default router;





