import {Router} from 'express';
import { SalesPerson, Supplier,SupplierList,editView,detailView } from '../Controller/Supplier.controller.js';



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(Supplier);
router.route('/list').get(SupplierList);
router.route('/view/:id').put(editView);
router.route('/view/:id').get(detailView);



export default router;





