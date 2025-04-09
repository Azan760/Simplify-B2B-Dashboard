import React from 'react'
import HocInputForm from '../../../Components/HocInputForm'
import NewClient from '../Sale/NewClient'
import { supplierDetail } from './Data';


const NewSupplier = HocInputForm(NewClient, {
  
  title: "New Supplier",
  navigatePath : "/Purchase/AllNewSupplier",
  url : "http://localhost:8000/supplier/new",
  Detail : [...supplierDetail]
  


});

export default NewSupplier;