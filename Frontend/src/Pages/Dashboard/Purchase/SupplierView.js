import HocInputForm from '../../../Components/HocInputForm'
import { supplierDetail } from './Data';
import ClientView from '../Sale/ClientView'


const SupplierView = HocInputForm(ClientView, {
  
  title: "Supplier Management",
  navigatePath : "/supplier/list",
  url : "http://localhost:8000/supplier/view",
  url2: "http://localhost:8000/supplier/edit",
  Detail : [...supplierDetail]
  


});

export default SupplierView;