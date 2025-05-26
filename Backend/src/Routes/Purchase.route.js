import {Router} from 'express';
import {NewPurchaseInvoice,GetPurchaseInvoice } from "../Controller/PurchaseInvoice.controller.js";
import { NewPurchaseOrder,GetPurchaseOrder, detailView } from "../Controller/PurchaseOrder.controller.js";
import {getSupplier} from "../Utils/GetSupplier.js"
import { getProducts} from "../Utils/GetProducts.js"




const router = Router();

router.route('/pi/new').get(getSupplier);
router.route('/pi/new/products').get(getProducts);
router.route('/pi/new').post(NewPurchaseInvoice);
router.route('/pi/list').get(GetPurchaseInvoice);

router.route('/po/new').get(getSupplier);
router.route('/po/new/products').get(getProducts);
router.route('/po/new').post(NewPurchaseOrder);
router.route('/po/list').get(GetPurchaseOrder);
router.route('/po/view/:id').get(detailView);


export default router;





