import HocInputForm from '../../../Components/HocInputForm'
import EditInvoiceAndEstimate from '../../../Components/InvoiceAndEstimateEdit';



const EditSaleInvoice = HocInputForm(EditInvoiceAndEstimate, {
  
  title: "Sale Invoice",
  navigatePath: '/sales/si/edit',
  inputHeader : "Client Details",
  url : "http://localhost:8000/sales/si/edit",
  url2 : "http://localhost:8000/sales/si/new"


});

export default EditSaleInvoice;