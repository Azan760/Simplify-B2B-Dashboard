import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates';



const NewEstimate = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Sale Invoice",
  navigatePath: '/Sale/AllSaleInvoice',
  inputHeader : "Client Details",
  url : "http://localhost:8000/sales/si/new",
  url2 : "http://localhost:8000/sales/si/new/products"


});

export default NewEstimate;