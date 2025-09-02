import {Router} from 'express';
import {NewSaleEstimate,GetSaleEstimate, detailView } from "../Controller/SaleEstimate.js";
import {NewSaleInvoice,GetAllSaleInvoice,Invoice_detailView,SalesPerson,SaleInvoice_EditView } from "../Controller/SaleInvoice.controller.js";
import {getClients} from "../Utils/GetClients.js"
import {getProducts} from "../Utils/GetProducts.js"
import { verifyToken } from '../Middlewares/auth.middlewares.js';
import { roleMiddleware } from '../Middlewares/role.middleware.js';

const router = Router();
 
// Allowed roles for sales routes
const salesRoles = ['Admin', 'Sales Manager', 'Sales Person'];

// Estimates...
router.route('/se/new')
  .get(verifyToken, roleMiddleware(salesRoles), getClients)
  .post(verifyToken, roleMiddleware(salesRoles), NewSaleEstimate);
router.route('/se/new/products').get(verifyToken, roleMiddleware(salesRoles), getProducts);
router.route('/se/list').get(verifyToken, roleMiddleware(salesRoles), GetSaleEstimate);
router.route('/se/edit/:id').get(verifyToken, roleMiddleware(salesRoles), detailView);

// invoices...
router.route('/si/new')
  .get(verifyToken, roleMiddleware(salesRoles), getClients)
  .post(verifyToken, roleMiddleware(salesRoles), NewSaleInvoice);
router.route('/si/new/salesPerson').get(verifyToken, roleMiddleware(salesRoles), SalesPerson);
router.route('/si/new/products').get(verifyToken, roleMiddleware(salesRoles), getProducts);
router.route('/si/list').get(verifyToken, roleMiddleware(salesRoles), GetAllSaleInvoice);
router.route('/si/edit/:id')
  .get(verifyToken, roleMiddleware(salesRoles), Invoice_detailView)
  .put(verifyToken, roleMiddleware(salesRoles), SaleInvoice_EditView);

export default router;





