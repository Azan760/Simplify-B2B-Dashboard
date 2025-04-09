import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { saleClientDetail, saleInvoiceDetail, saleProduct, aggregateTable } from '../Data/Data';
import FormInput from './FormInput';
import InputField from './InputField';
import { useDate } from './Date';
import { useNavigate } from 'react-router';
import SelectOptions from './SelectOptions';
import DynamicField from './DynamicField';
import { arrowClockwise, arrowLeft, back } from './Icons';
import Button from './Button';
import TextArea from './TextArea';
import '../Css/NewInvoiceEstimates.css'
import { useQuery } from 'react-query';
import { useFetch } from '../Services/ApiService';


const NewInvoiceEstimates = ({ title, navigatePath, inputHeader }) => {


    const [, formattedDateForInput, formattedDueDateForInput] = useDate();
    const navigate = useNavigate();
    const { getFetch, postFetch } = useFetch("http://localhost:8000/sales/si/new");



    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue,
        watch

    } = useForm(
        {
            defaultValues: {

                date: formattedDateForInput,
                dueDate: formattedDueDateForInput,
                vatType: "Standard VAT",
                Product: [],
                notes: "Custom Invoice Note Added from Settings.",

            },

        },
    );

    const { fields, append, remove } = useFieldArray({ control, name: "Product" });

    const searchTerm = watch("clientName");

    const { data: allClients = [], isLoading, error } = useQuery(
        ['fetchAllData', searchTerm],
        async () => {
            const response = await getFetch(searchTerm);
            console.log(response);
            return response.data;
        },
        {
            enabled : searchTerm?.length > 1,
            refetchOnWindowFocus: false,
            keepPreviousData : true,
        
        }
    );



    useEffect(() => {

        if (allClients) {

            saleClientDetail[0].selectOption = [];


            allClients.forEach(item => {
                if (item?.details?.clientName &&
                    !saleClientDetail[0].selectOption.includes(item.details.clientName)) {
                    saleClientDetail[0].selectOption.push(item.details.clientName);
                }
            });

            const selectedClient = allClients.find(items => items?.details?.clientName === watch("clientName"));

            if (selectedClient) {

                selectedClient.contactPersons.forEach(person => {
                    if (!saleClientDetail[1].selectOption.includes(person.fullName)) {
                        saleClientDetail[1].selectOption.push(person.fullName);
                    }
                });

                setValue("email", selectedClient.details.email);
                setValue("addressType", "Bill To Address");

                if (selectedClient) {
                    if (watch("addressType") === "Bill To Address") {
                        setValue("shipToAddress", selectedClient?.locations?.billToAddress?.address1 || "");
                    } else if (watch("addressType") === "Ship To Address") {
                        setValue("shipToAddress", selectedClient?.locations?.shipToAddress?.address1 || "");
                    }
                }

            }
        }
    }, [allClients, watch("clientName"), setValue]);








    async function onSubmit(data) {

        try {

            await postFetch(data);
            reset();
        } catch (error) {
            console.error('Error in form submission:', error.message);
        }
    }

    const handleAddProduct = () => {
        // append({  });

    };


    const handleNavigate = useCallback(() => {
        navigate(navigatePath);
    }, [navigate, navigatePath]);



    return (

        <>

            <div style={{ height: "calc(100% - 60px)" }}>
                <div className="heading mb-5 gap-2.5  items-center flex sm:justify-center    xsm:justify-center">
                    <span onClick={() => { navigate(navigatePath) }}
                        className='border border-textColor2 rounded p-2 shadow-sideShadow'>
                        {back}
                    </span>
                    <h6 style={{ letterSpacing: '1px' }} className="font-semibold
                 text-heading  text-xl  xsm:text-lg">  {title} </h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className='mb-5'>
                        <div className='flex justify-between mb-2.5'>
                            <div className='flex items-center'>
                                <p className='text-base text-textColor font-semibold tracking-wider'> {inputHeader} </p>
                            </div>
                        </div>

                        <div style={{ gridTemplateColumns: '2fr 1fr' }}
                            className='client-Detail grid gap-3 mb-6 sm:grid-cols-1 xsm:grid-cols-1'>

                            <div className=' grid gap-3 grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1'>
                                {
                                    saleClientDetail.map((fields, index) => {
                                        return (

                                            <div key={index} className={`flex flex-col`}>

                                                {fields.isSelect ?

                                                    (<SelectOptions field={fields} setValue={setValue} register={register}
                                                        errors={errors} />)
                                                    :
                                                    (<InputField fields={fields} errors={errors}
                                                        register={register} />
                                                    )
                                                }
                                            </div>
                                        )

                                    })}

                            </div>

                            <TextArea register={register} label="Ship to Address"
                                placeholder="Enter Address" inputName="shipToAddress" disabled={true}
                            />

                        </div>

                    </div>


                    <div className='mb-5'>

                        <div className='flex justify-between mb-2.5'>
                            <div className='flex items-center'>
                                <p className='text-base text-textColor font-semibold tracking-wider'> Invoice Details </p>
                            </div>
                        </div>

                        <div className='grid gap-3 sm:grid-cols-1 xsm:grid-cols-1 grid-cols-3'>
                            <FormInput fieldData={saleInvoiceDetail} register={register}
                                errors={errors} setValue={setValue} />

                        </div>

                    </div>

                    <div className='mb-5 xsm:overflow-x-auto'>

                        <DynamicField fieldConfig={saleProduct} register={register} errors={errors}
                            fields={fields} remove={remove} append={append} fieldName="Product"
                            setValue={setValue} watch={watch}
                        />

                    </div>


                    <div className=' grid-cols-[3fr_2fr] grid gap-5 xsm:grid-cols-1'>
                        <div className='grid gap-5 grid-cols-1'>

                            <TextArea label="Additional Notes" inputName="notes" register={register} />

                            <TextArea label="Payment Terms" inputName="paymentTerms" register={register} />

                        </div>

                        <div className="grid border-2 rounded  border-darkBlue mt-5">
                            {
                                aggregateTable.map((field, index) => {
                                    return (

                                        <div key={index} className="grid  grid-cols-2 border-b  border-darkBlue   ">
                                            <span className='flex items-center justify-end text-sm px-2.5 text-darkBlue'>{field.lable} </span>
                                            <p className='flex items-center justify-end px-2.5 pr-5 bg-darkBlue text-white  border-b border-white '>
                                                <span className=' text-sm  block '> {field.value}  </span>
                                            </p>
                                        </div>
                                    )
                                })}
                        </div>

                    </div>


                    <div className='mb-5'>
                        <div className='py-5'>
                            <div className='flex justify-between button '>

                                <Button
                                    type="button" label="Back" onClick={handleNavigate}
                                    icon={arrowLeft} className={` flex  border border-searchIcon   bg-white text-textColor2`}
                                />

                                <div className='flex button'>

                                    <Button
                                        type="reset" label="Reset" disabled={!isDirty || isSubmitting}
                                        icon={arrowClockwise}
                                        className={`   flex  ${(!isDirty || isSubmitting) && 'opacity-50'} border border-searchIcon   bg-white text-textColor2`}
                                    />

                                    <Button
                                        type="submit" label="Submit" onSubmit={reset} disabled={!isDirty || isSubmitting}
                                        className={` inner-btn ${(!isDirty || isSubmitting) && 'opacity-50'}  bg-textColor text-white  ml-2.5`}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>

                </form>


            </div>


        </>

    )
}

export default NewInvoiceEstimates
