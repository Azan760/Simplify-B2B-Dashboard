import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates';



const NewEstimate = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Sale Invoice",
  navigatePath: '/sales/si/list',
  inputHeader : "Client Details",
  url : "http://localhost:8000/sales/si/new",
  url2 : "http://localhost:8000/sales/si/new/products",
  url3 : "http://localhost:8000/sales/si/new/salesPerson",


});

export default NewEstimate;