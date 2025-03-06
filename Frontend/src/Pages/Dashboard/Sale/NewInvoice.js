import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates';



const NewEstimate = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Sale Invoice",
  navigatePath: '/Sale/AllSaleInvoice',
  inputHeader : "Client Details"


});

export default NewEstimate;