import React, { useCallback,useEffect,useState } from 'react'
import { clientDetail, clientIcon, contactPerson, location1, location2 } from './Data'
import { useForm, useFieldArray } from 'react-hook-form'
import FormInput from '../../../Components/FormInput'
import InputField from '../../../Components/InputField.js'
import Button from '../../../Components/Button'
import { arrowClockwise, arrowLeft } from '../../../Components/Icons'
import { useNavigate } from 'react-router'
import DynamicField from '../../../Components/DynamicField'
import { back,deleteIcon,refresh } from '../../../Components/Icons'
import '../../../Css/NewClient.css'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import "../../../Css/NewProduct.css"
import { useFetch } from "../../../Services/ApiService.js"
import { useQuery } from 'react-query'
import SelectOptions from '../../../Components/SelectOptions.js'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { formatDate } from '../../../Components/Date'



const ClientView = ({ title = "Add New Client", navigatePath = "client/all", url = "http://localhost:8000/client/view", Detail = [...clientDetail] }) => {


    const { id } = useParams();
    const { getFetch, updateFetch } = useFetch(`${url}/${id}`);
 const user = useSelector((state) => state.auth.user);
       const navigate = useNavigate();

    
    const { data: allData, isLoading, error } = useQuery(
        'clientData',
        async () => {
            const response = await getFetch();
            return response.statusCode["data"];
        },
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );
    
    
    
    useEffect(() => {
        if (allData) {
            
        }
    }, [allData]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue
        , watch
        
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
        data = { ...data, updatedBy: { id: user?._id, name: user?.fullName } };
        console.log(data);
        try {
            await updateFetch(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Helmet>
                <title> Client </title>
            </Helmet>

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
                                            {index === 2 && <span className=' text-sm ml-2.5'> {formatDate()} </span>}
                                        </div>)
                                })}
                            </div>
                        </div>

                        <div >
                            <div className='grid-cols-3 client-Details sm:grid-cols-1 xsm:grid-cols-1 mb-3.5 grid gap-2.5'>
                                {
                                    Detail.map((fields, index) => {
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
                                    }
                                    )}
                            </div>
                        </div>

                    </div>


                    <p className='flex my-5 border-b border-b-searchIcon pb-5 font-semibold text-textColor'>
                        Locations
                    </p>

                    <div className=' grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 location mb-5 grid gap-5'>
                        {location1.map((field, index) => {
                            return (
                                <div key={index} className=''>
                                    <div className='mb-2.5 flex justify-between items-center'>
                                        <p className='text-heading font-semibold'> {field.title} </p>
                                        {index === 1 &&
                                            (<div className='flex gap-1'>
                                                <input type="checkbox" className='border-0'  />
                                                <span> Same as Bill To Address   </span>
                                            </div>)}
                                    </div >

                                    <FormInput
                                        register={register} errors={errors} fieldData={field.address} className={'mb-2.5'}
                                    />

                                    {
                                        location2.map((field2, index2) => {
                                            return (
                                                index === index2 && (

                                                    <div key={index2} className=' grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1  grid gap-2.5'>
                                                        <FormInput
                                                            register={register} errors={errors} fieldData={field2.address} className={'mb-2.5'}
                                                        />

                                                    </div>))
                                        })}
                                </div>
                            )
                        })}
                    </div>


                    <div className='mb-5 '>
                        <DynamicField

                            errors={errors} register={register} fields={fields} remove={remove} append={handleContactPerson}
                            fieldConfig={contactPerson} fieldName="contactPerson" watch={watch} setValue={setValue}
                        />
                    </div>


                    <div className='pb-5 pt-5'>
                        <div className='flex justify-between button'>

                            <Button
                                type="button" label="Back" onClick={() => { navigate('/team/all') }}
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
                                        last updated by <span className="text-blue-600 font-semibold cursor-pointer">{allData?.updatedByBy?.name}</span>
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

export default ClientView
