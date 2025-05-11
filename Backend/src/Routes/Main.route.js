import {Router} from 'express';
import {GetAllSaleInvoice} from "../Controller/Main.controller.js";
import {GetAllSaleEstimates} from "../Controller/Main.controller.js";
import {GetAllPurchaseInvoice} from "../Controller/Main.controller.js";


const router = Router();
router.route('/si/list').get(GetAllSaleInvoice);
router.route('/se/list').get(GetAllSaleEstimates);
router.route('/pi/list').get(GetAllPurchaseInvoice);



export default router;





