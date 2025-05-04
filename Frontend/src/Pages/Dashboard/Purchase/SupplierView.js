import HocInputForm from '../../../Components/HocInputForm'
import { supplierDetail } from './Data';
import ClientView from '../Sale/ClientView'


const SupplierView = HocInputForm(ClientView, {
  
  title: "Supplier Management",
  navigatePath : "/supplier/list",
  url : "http://localhost:8000/supplier/view",
  Detail : [...supplierDetail]
  


});

export default SupplierView;