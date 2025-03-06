import React, { useCallback } from 'react'
import { clientDetail, clientIcon, contactPerson, location1, location2 } from './Data'
import { useDate } from '../../../Components/Date'
import { useForm, useFieldArray } from 'react-hook-form'
// import { useFetch } from '../../../Components/Fetch'
import FormInput from '../../../Components/FormInput'
import Button from '../../../Components/Button'
import { arrowClockwise, arrowLeft } from '../../../Components/Icons'
import { useNavigate } from 'react-router'
import DynamicField from '../../../Components/DynamicField'
import { back } from '../../../Components/Icons'
import '../../../Css/NewClient.css'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import "../../../Css/NewProduct.css"
import {useFetch} from "../../../Services/ApiService.js"



const NewClient = ({ title = "Add New Client", navigatePath = "/Sale/AllNewClient" }) => {


  const navigate = useNavigate();
  NProgress.configure({ showSpinner: false }); // Optional: Hide the spinner


  const [formattedDate] = useDate();
   const {postFetch} = useFetch("http://localhost:8000/client/new");



  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset

  } = useForm({

    defaultValues: {
      defaultTerm: 14,
      contactPerson: [],

    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "contactPerson" });


  const handleContactPerson = useCallback(() => {
    append({ fullName: '', email: '', phoneNo: '', salePerson: '' });
  }, [append]);

  const onSubmit = async (data) => {

    try {
      NProgress.start();

       await  postFetch(data);
      reset();
    } catch (error) {

      console.error('Error in form submission:', error.message);
    }finally {
            NProgress.done(); // Stop the loading bar
          }

  }


  const handleNavigate = useCallback(() => {
    navigate(navigatePath);
  }, [navigate, navigatePath]);



  return (


    <>


      <div style={{ height: "calc(100% - 60px)" }}>
        <div className="heading mb-5 gap-2.5  items-center flex sm:mb-8 xsm:mb-8">
          <span onClick={() => { navigate(navigatePath) }}
            className='border border-textColor2 rounded p-2 shadow-sideShadow'>
            {back}
          </span>
          <h6 style={{ letterSpacing: '1px' }} className="font-semibold
                 text-heading  text-xl  xsm:text-lg">  {title} </h6>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className=''>
            <div className='flex justify-between sm:flex-col sm:gap-2.5 xsm:gap-2.5 xsm:flex-col  mb-2.5'>
              <div className='flex items-center'>
                <p className='text-base text-textColor font-semibold tracking-wider'> Detail: </p>
              </div>
              <div className='flex detail-icon '>

                {clientIcon.map((value, index) => {
                  return (
                    <div key={index} className={`flex items-center   ml-5 sm:mr-2.5 sm:ml-0 ${value.classname}`}>
                      {value.inputName &&
                       <input  {...register(value.inputName)} defaultChecked type="checkbox"
                        className={`${value.inputClass} ${value.classname2}`} />}
                      <label className={`my-0.5 mx-1.5 ${value.classname2} text-sectionColor text-xs`}> {value.label} </label>
                      {value.icon}
                      {index === 2 && <span className=' text-sm ml-2.5'> {formattedDate} </span>}
                    </div>)
                })}
              </div>
            </div>

            <div >
              <div  className='grid-cols-3 client-Details sm:grid-cols-1 xsm:grid-cols-1 mb-3.5 grid gap-2.5'>

                <FormInput
                  fieldData={clientDetail}
                  register={register}
                  errors={errors}
                />

              </div>
            </div>

          </div>


          <p className='flex my-5 border-b border-b-searchIcon pb-5 font-semibold text-textColor'>
            Locations
          </p>

          <div  className=' grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 location mb-5 grid gap-5'>
            {location1.map((field, index) => {
              return (
                <div key={index} className=''>
                  <div className='mb-2.5'>
                    <p className='text-heading font-semibold'> {field.title} </p>
                  </div >

                  <FormInput
                    register={register} errors={errors} fieldData={field.address} className={'mb-2.5'}
                  />

                  {
                    location2.map((field2, index2) => {
                      return (
                        index === index2 && (

                          <div key={index2}  className=' grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1  grid gap-2.5'>
                            <FormInput
                              register={register} errors={errors} fieldData={field2.address} className={'mb-2.5'}
                            />

                          </div>))
                    })}
                </div>
              )
            })}
          </div>


          <div className='mb-5 overflow-x-auto'>
            <DynamicField

              errors={errors} register={register} fields={fields} remove={remove} append={handleContactPerson}
              fieldConfig={contactPerson} fieldName="contactPerson"
            />
          </div>


          <div className='pb-5 pt-5'>
            <div className='flex justify-between button'>

              <Button type="button" label="Back" onClick={handleNavigate} icon={arrowLeft}
                className={` flex  border border-searchIcon   bg-white text-textColor2`}
              />

              <div className='flex button'>

                <Button type="reset" label="Reset" disabled={!isDirty || isSubmitting} icon={arrowClockwise}
                  className={` flex  ${(!isDirty || isSubmitting) && 'opacity-50'} border border-searchIcon   bg-white text-textColor2`}
                />

                <Button
                  type="submit" label="Submit" onSubmit={reset} disabled={!isDirty || isSubmitting}
                  className={` ${(!isDirty || isSubmitting) && 'opacity-50'} inner-btn bg-textColor text-white  ml-2.5`}
                />
              </div>

            </div>
          </div>

        </form>
      </div>

    </>
  )
}

export default NewClient
