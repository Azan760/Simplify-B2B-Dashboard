import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates'




const NewPurchaseInvoice = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Purchase Order",
  navigatePath: '/Purchase/AllPurchaseInvoice',
  inputHeader : "Supplier Details"

});

export default NewPurchaseInvoice;