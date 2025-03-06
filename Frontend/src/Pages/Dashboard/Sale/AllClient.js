import HocInputForm from '../../../Components/HocInputForm'
import AllMember from "../Team/AllMember.js"


const NewEstimate = HocInputForm(AllMember, {
  
  title: "New Sale Invoice",
  navigatePath: '/Sale/AllSaleInvoice',
  inputHeader : "Client Details"


});

export default NewEstimate;