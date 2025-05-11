import HocInputForm from '../../../Components/HocInputForm'
import NewInvoiceEstimates from '../../../Components/NewInvoiceEstimates'



const NewOrder = HocInputForm(NewInvoiceEstimates, {
  
  title: "New Purchase Order",
  navigatePath: '/purchases/po/list',
  url : "http://localhost:8000/purchases/po/new",
  url2 : "http://localhost:8000/purchases/po/products",
  inputHeader : "Supplier Details"

});

export default NewOrder;