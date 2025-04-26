import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { ProductDetail, ProductIcon, saleTable } from './Data.js'
import { useDate } from '../../../Components/Date.js'
import '../../../Css/NewProduct.css'
import { arrowClockwise, arrowLeft, back } from '../../../Components/Icons.js'
import { useNavigate } from 'react-router'
import Button from '../../../Components/Button.js'
import DynamicField from '../../../Components/DynamicField.js'
import TextArea from '../../../Components/TextArea.js'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import InputField from '../../../Components/InputField'
import SelectOptions from '../../../Components/SelectOptions'
import { useFetch } from "../../../Services/ApiService.js"
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Helmet } from "react-helmet";




const NewProduct = () => {

    const [formattedDate] = useDate();
    NProgress.configure({ showSpinner: false });
    const user = useSelector((state) => state.auth.user);


    const { postFetch, getFetch } = useFetch("http://localhost:8000/product/new");

    const {
        register, handleSubmit, control, watch, formState: { errors, isSubmitting, isDirty }, reset, setValue }
        = useForm(
            {
                defaultValues: {
                    salesPersonAssignment: [],
                    type: "Inventory",
                },
            },
        );

    const { fields, append, remove } = useFieldArray({ control, name: "salesPersonAssignment" });

    const { data: salesPerson, isLoading, error } = useQuery(
        ['fetchAllData'],
        async () => {
            const response = await getFetch();
            console.log(response);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
        }
    );

    const navigate = useNavigate();

    const handleAddPerson = useCallback(() => {
        append({ assignedUser: '', purchasePrice: '', salePrice: '', profit: '' });
    }, [append]);

    const handleRemovePerson = useCallback((index) => {
        remove(index);
    }, [remove]);

    const handleBack = useCallback(() => {

        navigate('/product/list');
    }, [navigate]);

    const handleReset = useCallback(() => {
        reset();
    }, []);

    saleTable[0].inputs[0].selectOption = [];

    salesPerson?.forEach(item => {
        // if (!saleTable[0].inputs[0].selectOption.includes(item.fullName)) {
        //     saleTable[0].inputs[0].selectOption.push(item.fullName);
        // }
    });


    const onSubmit = async (data) => {

        data = { ...data, createdBy: { id: user?._id, name: user?.fullName } };
        console.log(data);
        try {
            await postFetch(data);
            NProgress.start();
            navigate('/product/list');
            reset();
        } catch (error) {
            console.error('Error in form submission:', error.message);
        } finally {
            NProgress.done();
        }

    };

    return (
        <>

            <Helmet>
                <title> New Product </title>
            </Helmet>

            <div style={{ height: "calc(100% - 60px)" }}>
                <div className="heading mb-5 xsm:mb-8 gap-2.5  items-center flex sm:justify-center 
                xsm:justify-center ">
                    <span onClick={() => { navigate("/Product/AllProduct") }}
                        className='border border-textColor2 rounded p-2 shadow-sideShadow'>
                        {back}
                    </span>
                    <h6 className="font-semibold
                 text-heading  text-xl  xsm:text-lg">  Add New Product/Service </h6>
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
                                            {index === 3 && <span className=' text-sm ml-2.5'> {formattedDate} </span>}
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
                                type="button" label="Back"
                                onClick={handleBack}
                                icon={arrowLeft}
                                className={` flex  border border-searchIcon   bg-white text-textColor2`}
                            />

                            <div className='flex button'>

                                <Button
                                    type="reset" label="Reset" disabled={!isDirty || isSubmitting}
                                    icon={arrowClockwise}
                                    className={` flex  ${(!isDirty || isSubmitting) && 'opacity-50'} border border-searchIcon   bg-white text-textColor2`}
                                />

                                <Button
                                    type="submit" label="Submit" onSubmit={handleReset}
                                    disabled={!isDirty || isSubmitting}
                                    className={` inner-btn ${(!isDirty || isSubmitting) && 'opacity-50'}  bg-textColor text-white  ml-2.5`}
                                />
                            </div>

                        </div>
                    </div>
                </form >
            </div >

        </>)
}



export default NewProduct
