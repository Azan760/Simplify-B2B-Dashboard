import {Router} from 'express';
import {NewProduct} from "../Controller/NewProduct.controller.js";
import {SalesPerson} from "../Controller/NewProduct.controller.js";



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(NewProduct);


export default router;





