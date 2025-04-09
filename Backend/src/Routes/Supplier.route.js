import {Router} from 'express';
import { SalesPerson, Supplier } from '../Controller/NewSupplier.controller.js';



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(Supplier);


export default router;





