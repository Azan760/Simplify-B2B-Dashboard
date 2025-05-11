import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates'



const NewEstimate = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Sale Estimate",
  navigatePath: '/sales/se/list',
  url : "http://localhost:8000/sales/se/new",
  inputHeader : "Client Details",
  url2 : "http://localhost:8000/sales/se/products",


});

export default NewEstimate;
