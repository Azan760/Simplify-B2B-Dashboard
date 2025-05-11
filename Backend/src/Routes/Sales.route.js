import {Router} from 'express';
import {NewSaleEstimate,GetSaleEstimate } from "../Controller/SaleEstimate.js";
import {NewSaleInvoice,GetAllSaleInvoice } from "../Controller/SaleInvoice.controller.js";
import {getClients} from "../Utils/GetClients.js"
import {getProducts} from "../Utils/GetProducts.js"

const router = Router();

// Estimates...
router.route('/se/new').get(getClients);
router.route('/se/new/products').get(getProducts);
router.route('/se/new').post(NewSaleEstimate);
router.route('/se/list').get(GetSaleEstimate);

// invoices...
router.route('/si/new').get(getClients);
router.route('/si/new/products').get(getProducts);
router.route('/si/new').post(NewSaleInvoice);
router.route('/si/list').get(GetAllSaleInvoice);


export default router;





