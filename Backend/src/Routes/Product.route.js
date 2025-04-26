import {Router} from 'express';
import {NewProduct,allProducts,SalesPerson,editView, detailView} from "../Controller/NewProduct.controller.js";



const router = Router();
router.route('/new').get(SalesPerson);
router.route('/new').post(NewProduct);
router.route('/list').get(allProducts);
router.route('/view/:id').get(detailView);
router.route('/view/:id').put(editView);


export default router;





