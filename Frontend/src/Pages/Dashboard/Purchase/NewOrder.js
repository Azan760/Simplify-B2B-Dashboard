import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates'



const NewOrder = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Purchase Order",
  navigatePath: '/Sale/AllPurchaseOrder',
  inputHeader : "Supplier Details"

});

export default NewOrder;