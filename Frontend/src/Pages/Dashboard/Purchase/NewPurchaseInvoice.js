import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates'
import {supplierDetail} from "./Data"




const NewPurchaseInvoice = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Purchase Order",
  navigatePath: '/purchases/pi/list',
  inputHeader : "Supplier Details",
  url : "http://localhost:8000/purchases/pi/new",
  url2 : "http://localhost:8000/purchases/pi/products",
  

});

export default NewPurchaseInvoice;