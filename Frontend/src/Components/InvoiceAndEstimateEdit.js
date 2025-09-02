import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { saleClientDetail, saleInvoiceDetail, saleProduct, aggregateTable } from '../Data/Data';
import FormInput from './FormInput';
import InputField from './InputField';
import { useDate, formatDate,convertToInputDateFormat } from './Date';
import { useNavigate } from 'react-router';
import SelectOptions from './SelectOptions';
import DynamicField from './DynamicField';
import { arrowClockwise, arrowLeft, back, refresh, deleteIcon } from './Icons';
import Button from './Button';
import TextArea from './TextArea';
import '../Css/NewInvoiceEstimates.css'
import { useQuery } from 'react-query';
import { useFetch } from '../Services/ApiService';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import NProgress from 'nprogress';



const EditInvoiceAndEstimate = ({ title, navigatePath, inputHeader, url, url2, url3,
    Detail = [...saleClientDetail] }) => {


    const { id } = useParams();
        NProgress.configure({ showSpinner: false });
    



    const [, formattedDateForInput, formattedDueDateForInput] = useDate();
    const [grossSum, setGrossSum] = useState();
    const [totalQuanity, setTotalQuanity] = useState(0);
    const [totalVat, setTotalVat] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    console.log("totalQuanity", totalQuanity);


    // useEffect(() => {

    //     if (totalQuanity > 0 || totalVat > 0 || grossSum > 0) {
    aggregateTable[0].value = totalQuanity;
    aggregateTable[3].value = totalVat;
    aggregateTable[2].value = totalAmount?.toFixed(2);
    aggregateTable[4].value = grossSum?.toFixed(2);
    //     }
    // }, [totalQuanity, totalVat, grossSum])




    const navigate = useNavigate();

    const { getFetch, updateFetch } = useFetch(`${url}/${id}`);
    const { getFetch: getProducts } = useFetch(url2);

    const { getFetch: salesPerson } = useFetch(url3);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue,
        watch,

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

    const { fields, append, remove, replace } = useFieldArray({ control, name: "Product" });

    const { data: allData } = useQuery(
        'fetchInvoice',
        async () => {
            const response = await getFetch();
            console.log(response);
            return response.statusCode["data"];
        },
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (allData) {

            setValue("clientName", allData?.clientDetails?.clientName);
            setValue("contactPerson", allData?.clientDetails?.contactPerson);
            setValue("email", allData?.clientDetails?.email);
            setValue("addressType", allData?.clientDetails?.addressType);
            setValue("date", convertToInputDateFormat(allData?.invoiceDetails?.date));
            setValue("dueDate", convertToInputDateFormat(allData?.invoiceDetails?.dueDate));
            setValue("purchaseRefernce", allData?.invoiceDetails?.purchaseRefernce);
            setValue("currency", allData?.invoiceDetails?.currency);
            setValue("exchangeRate", allData?.invoiceDetails?.exchangeRate);
            setValue("vatType", allData?.invoiceDetails?.vatType);
            setValue("shipToAddress", allData?.details?.shipToAddress);
            setValue("notes", allData?.invoiceNotesDetail?.additionalNotes);
            setValue("paymentTerms", allData?.invoiceNotesDetail?.paymentTerm);
            setValue("assignTo", allData?.invoiceDetails?.assigneTo?.name || '');


            if (allData?.product) {
                replace(
                    allData.product.map((item) => ({
                        productServiceName: item?.productServiceName || '',
                        quantity: item?.quantity || '',
                        sku: item?.sku || '',
                        unitPrice: item?.unitPrice || '',
                        category: item?.category || '',
                        vatAmount: parseFloat(item?.vatAmount.$numberDecimal).toFixed(2) || '',

                    }))
                );
            }
        }
    }, [allData, setValue, replace]);





    const handleAddProduct = useCallback(() => {
        append({
            productServiceName: '', sku: '', category: '', quantity: '', unitPrice: '',
            vatRate: 0, vatAmount: '', grossTotal: 0
        });
    }, [append]);


    const { data: allProduct = [] } = useQuery(
        ['fetchAllProducts'],
        async () => {
            const response = await getProducts();
            console.log("response",response);
            return response?.data;
        },
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

    const { data: allSalesPerson } = useQuery(
        ['fetchAllSalesPerson'],
        async () => {
            const response = await salesPerson();
            const salePerson = response?.data;
            console.log(salePerson);

            saleInvoiceDetail[6].selectOption = [];

            if (salePerson) {

                salePerson.map((value, index) => {

                    saleInvoiceDetail[6].selectOption.push(value?.fullName);
                })

            }
        },
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (allProduct.length > 0) {
            saleProduct[0].inputs[0].selectOption = [];

            allProduct.forEach(item => {
                const name = item?.details?.productServiceName;
                if (name && !saleProduct[0].inputs[0].selectOption.includes(name)) {
                    saleProduct[0].inputs[0].selectOption.push(name);
                }
            });
        }

    }, [allProduct]);

    const user = useSelector((state) => state.auth.user);

       const onSubmit = async (data) => {
   
           data = { ...data, updatedBy: { id: user?._id, name: user?.fullName } };
           console.log(data);
           try {
               await updateFetch(data);
               NProgress.start();
           } catch (error) {
               console.error('Error in form submission:', error.message);
           } finally {
               NProgress.done();
           }
   
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
                 text-heading  text-xl  xsm:text-lg">  {title}
                        <span className='text-textColor font-semibold text-xl xsm:text-lg' > #{allData?.SINumber} </span>
                    </h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate >

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
                                    Detail.map((fields, index) => {
                                        return (

                                            <div key={index} className={`flex flex-col`}>

                                                {fields.isSelect ?

                                                    (<SelectOptions field={fields} setValue={setValue} register={register}
                                                        errors={errors}
                                                    />
                                                    )
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
                            {/* <FormInput fieldData={saleInvoiceDetail} register={register}
                                errors={errors} setValue={setValue} /> */}
                            {saleInvoiceDetail.map((fields, index) => {
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

                    </div>


                    <DynamicField fieldConfig={saleProduct} register={register} errors={errors}
                        fields={fields} remove={remove} append={handleAddProduct} fieldName="Product"
                        setValue={setValue} watch={watch}
                        // setIndex={setIndex} 
                        setGrossSum={setGrossSum} setTotalQuanity={setTotalQuanity} allProduct={allProduct}
                        setTotalVat={setTotalVat} setTotalAmount={setTotalAmount}
                    />


                    <div className=' grid-cols-[3fr_2fr] grid gap-5 xsm:grid-cols-1'>
                        <div className='grid gap-5 grid-cols-1'>

                            <TextArea label="Additional Notes" inputName="notes" register={register} />

                            <TextArea label="Payment Terms" inputName="paymentTerms" register={register} />

                        </div>

                        <div className="grid border-2 rounded  border-darkBlue mt-10 h-52">
                            {
                                aggregateTable.map((field, index) => {
                                    return (



                                        <div key={index} className={`   ${index === 3 && totalVat <= 0 ? "hidden" : "grid"} grid-cols-2 border-b  border-darkBlue   `}>
                                            <span className='flex items-center justify-end text-sm px-2.5 text-darkBlue'>{field.lable} </span>
                                            <p className='flex items-center justify-end px-2.5 pr-5 bg-darkBlue text-white  border-b border-white '>
                                                <span {...register(field.inputName)} className=' text-sm  block '> {field.value}  </span>
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
                                    icon={arrowLeft}
                                    className={` flex  border border-blanche bg-white text-textColor2`}
                                />

                                <div className='flex button'>

                                    <Button
                                        type="button" label="Delete"
                                        icon={deleteIcon} className={` flex   border text-white bg-reds border-searchIcon`}
                                    />
                                    <Button
                                        type="submit" icon={refresh} label="Update" onSubmit={reset} disabled={!isDirty || isSubmitting}
                                        className={` ${(!isDirty || isSubmitting) && 'opacity-50'} flex inner-btn  bg-textColor text-white  ml-3`}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>


                    <div className="mt-5 pb-7 h-full w-full">
                        <p className="text-textColor font-semibold text-base pb-5 border-b-2 border-gray-200">
                            Recent History
                        </p>

                        <div className="bg-white mt-5 rounded-lg p-4 shadow-sideShadow">
                            <div className="flex gap-4 relative pb-6">
                                <div className="flex flex-row">
                                    <div className='flex flex-col items-center w-20'>
                                        <p className="text-sm font-bold text-gray-800">{formatDate(allData?.updatedAt)}</p>
                                        <p className="text-xs text-gray-500 mt-1">09:23 AM</p>
                                    </div>
                                    <div className="flex flex-col items-center w-20 relative">
                                        <div className="w-4 h-4 border-2 border-gray-400 bg-white rounded-full relative z-10"></div>

                                        <div className="w-0.5 bg-gray-300 h-20 absolute top-4 z-0"></div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 rounded p-3.5">
                                    <p className="font-semibold text-gray-800 text-sm">Update</p>
                                    <p className="text-sm text-gray-500">
                                        last updated by <span className="text-blue-600 font-semibold cursor-pointer">{allData?.updatedBy?.name}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 relative">
                                <div className="flex flex-row">
                                    <div className='flex flex-col items-center w-20'>
                                        <p className="text-sm font-bold text-gray-800">{formatDate(allData?.createdAt)}</p>
                                        <p className="text-xs text-gray-500 mt-1">09:23 AM</p>
                                    </div>
                                    <div className="flex flex-col items-center w-20 relative">
                                        <div className="w-4 h-4 border-2 border-gray-400 bg-white rounded-full relative z-10"></div>

                                        <div className="w-0.5 bg-gray-300 h-12 absolute top-4 z-0"></div>
                                    </div>
                                </div>


                                <div className="bg-gray-100 rounded p-3.5">
                                    <p className="font-semibold text-gray-800 text-sm">Create</p>
                                    <p className="text-sm text-gray-500">
                                        created by <span className="text-blue-600 font-semibold cursor-pointer">{allData?.createdBy?.name}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>


            </div>


        </>

    )
}

export default EditInvoiceAndEstimate
