import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { ProductDetail, ProductIcon, saleTable, } from './Data.js'
import { formatDate } from '../../../Components/Date.js'
import '../../../Css/NewProduct.css'
import {arrowLeft, back,refresh, deleteIcon  } from '../../../Components/Icons.js'
import { useNavigate } from 'react-router'
import Button from '../../../Components/Button.js'
import DynamicField from '../../../Components/DynamicField.js'
import TextArea from '../../../Components/TextArea.js'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import InputField from '../../../Components/InputField.js'
import SelectOptions from '../../../Components/SelectOptions.js'
import { useFetch } from "../../../Services/ApiService.js"
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom'


const ProductView = () => {

    NProgress.configure({ showSpinner: false });
    const user = useSelector((state) => state.auth.user);

    const { id } = useParams();

    const { getFetch, updateFetch } = useFetch(`http://localhost:8000/product/view/${id}`);

    const {
        register, handleSubmit, control ,watch,  formState: { errors, isSubmitting, isDirty }, reset, setValue }
        = useForm(
        );

    const { fields, append, remove,replace } = useFieldArray({ control, name: "salesPersonAssignment" });

    const navigate = useNavigate();
    
    const { data: allData, isLoading, error } = useQuery(
        'productData',
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
            setValue("sku", allData?.details?.sku);
            setValue("productServiceName", allData?.details?.productServiceName);
            setValue("type", allData?.details?.type);
            setValue("category", allData?.details?.category);
            setValue("subCategory", allData?.details?.subCategory);
            setValue("brand", allData?.details?.brand);
            setValue("buy", allData?.details?.buy);
            setValue("sell", allData?.details?.sell);
            setValue("salePrice", allData?.details?.salePrice);
            setValue("purchaseCost", allData?.details?.purchaseCost);
            setValue("profit", allData?.details?.profit);
            setValue("color", allData?.details?.color);
            setValue("vatRate", allData?.details?.vatRate);
            setValue("description", allData?.details?.description);

            if (allData?.salesPersonAssignment) {
                replace(
                    allData.salesPersonAssignment.map((item) => ({
                        assignedUser: item?.assignedUser?.name || '',
                        purchasePrice: item?.purchasePrice || '',
                        salePrice: item?.salePrice || '',
                        profit: item?.profit || '',
                    }))
                );
            }
        }
    }, [allData, setValue, replace]);



    const handleAddPerson = useCallback(() => {
        append({ assignedUser: '', purchasePrice: '', salePrice: '', profit: '' });
    }, [append]);

    const handleRemovePerson = useCallback((index) => {
        remove(index);
    }, [remove]);

    const handleBack = useCallback(() => {

       navigate('/product/list');
    }, [navigate]);



    const onSubmit = async (data) => {

        data = { ...data, updatedBy: { id: user?._id, name: user?.fullName } };
        try {
            await updateFetch(data);
            NProgress.start();
        } catch (error) {
            console.error('Error in form submission:', error.message);
        } finally {
            NProgress.done();
        }

    };

    return (
        <>

            <Helmet>
                <title> View/Edit Product </title>
            </Helmet>

            <div style={{ height: "calc(100% - 60px)" }}>
                <div className="heading mb-5 xsm:mb-8 gap-2.5  items-center flex sm:justify-center 
                xsm:justify-center ">
                    <span onClick={() => { navigate("/product/all") }}
                        className='border border-textColor2 rounded p-2 shadow-sideShadow'>
                        {back}
                    </span>
                    <h6 className="font-semibold
                 text-heading  text-xl  xsm:text-lg"> Edit Product/Service </h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='mb-3.5'>
                        <div className='flex justify-between sm:items-start xsm:items-start sm:flex-col xsm:flex-col xsm:gap-2.5 mb-2.5 sm:gap-2.5'>
                            <div className='flex items-center'>
                                <p className='text-base text-textColor font-semibold tracking-wider'> Product Details </p>
                            </div>
                            <div className='flex xsm:flex-col xsm:gap-2.5'>

                                {ProductIcon.map((value, index) => {
                                    return (
                                        <div key={index} className={`flex items-center mr-5 sm:mr-1  ${value.classname}`}>
                                            {value.inputName && <input {...register(value.inputName)} type="checkbox" defaultChecked className={`${value.inputClass} ${value.classname2}`} />}
                                            <label className={`my-0.5 mx-1.5 ${value.classname2}
                                             text-sectionColor text-xs`}> {value.label} </label>
                                            {value.icon}
                                            {index === 3 && <span className=' text-sm ml-2.5'> {formatDate(allData?.createdAt)} </span>}
                                        </div>)
                                })}
                            </div>
                        </div>
                        <div >
                            <div className='mb-5 grid gap-3  md:grid-cols-1 sm:grid-cols-1 xsm:grid-cols-1 grid-cols-3'>
                                {
                                    ProductDetail.map((fields, index) => {
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
                                    })

                                }
                            </div>
                        </div>
                    </div>

                    <DynamicField
                        fieldConfig={saleTable} register={register} setValue={setValue} errors={errors}
                        fields={fields} remove={handleRemovePerson} append={handleAddPerson}
                        fieldName="salesPersonAssignment" watch={watch}
                    />

                    <TextArea label="Description" register={register} inputName="description"
                        placeholder="Description" />

                    <div className='pb-5 pt-5'>
                        <div className='flex justify-between button'>

                            <Button
                                type="button" label="Back" onClick={handleBack}
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

                </form >
            </div >

        </>)
}



export default ProductView
