import React from 'react'
import HocInputForm from '../../../Components/HocInputForm'
import NewClient from '../Sale/NewClient'


const NewSupplier = HocInputForm(NewClient, {
  
  title: "New Supplier",
  navigatePath : "/Purchase/AllNewSupplier"
  


});

export default NewSupplier;