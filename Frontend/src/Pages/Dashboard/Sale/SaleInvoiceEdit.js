import HocInputForm from '../../../Components/HocInputForm'
import EditInvoiceAndEstimate from '../../../Components/InvoiceAndEstimateEdit';



const EditSaleInvoice = HocInputForm(EditInvoiceAndEstimate, {
  
  title: "Sale Invoice",
  navigatePath: '/sales/si/list',
  inputHeader : "Client Details",
  url : "http://localhost:8000/sales/si/edit",
  url2 : "http://localhost:8000/sales/si/new/products",
  url3 : "http://localhost:8000/sales/si/new/salesPerson",



});

export default EditSaleInvoice;