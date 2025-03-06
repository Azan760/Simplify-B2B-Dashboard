import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates'



const NewEstimate = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Sale Estimate",
  navigatePath: '/Sale/AllSaleEstimate',
  inputHeader : "Client Details"


});

export default NewEstimate;
