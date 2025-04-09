import {Router} from 'express';
import {NewProduct,allProducts,SalesPerson,editView} from "../Controller/NewProduct.controller.js";



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(NewProduct);
router.route('/list').get(allProducts);
router.route('/view/:id').get(editView);


export default router;





