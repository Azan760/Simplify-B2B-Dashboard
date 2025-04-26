
import React from 'react'
import RectangleArtSmall from "../../Assets/RectangleArtSmall.svg"
import RectangleArtLarge from "../../Assets/RectangleArtLarge.svg"
import { Helmet } from "react-helmet";
import simplifyLogo from "../../Assets/simplify-logo.jpeg"
import { useForm } from "react-hook-form"
import Button from '../../Components/Button';
import { arrowClockwise } from '../../Components/Icons';
import InputField from '../../Components/InputField.js';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useFetch } from '../../Services/ApiService.js';
import {useParams} from 'react-router-dom'

const NewPassword = () => {

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting, isDirty } } = useForm({});
    const inputField = [
        {
            span: "Password",
            paddingLeft: "pl-8",
            placeholder: "Password",
            required: "Password is required.",
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            types: 'password',

            inputName: "password",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className=" absolute text-searchIcon top-2.5 left-2 bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>,
        }, {
            span: "Confirm Password",
            paddingLeft: "pl-8",
            placeholder: "Confirm Password",
            types: 'password',
            required: "Confirm Password is required",
            inputName: "confirmPassword",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className=" absolute text-searchIcon top-2.5 left-2 bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            message2: "Password must contain at least 1 number, 1 uppercase, and 1 lowercase letter.",
        }
    ];

    const {id} = useParams();
    console.log(id);

    const { updateFetch } = useFetch(`http://localhost:8000/team/createPassword/${id}`);

    const onSubmit = async (data) => {
        try {
            await updateFetch(data);
            console.log(data);

            reset();
        } catch (error) {
            console.log(error.message);
        }

    }
    const navigate = useNavigate();

    // const handleReset = useCallback(() => {
    //     reset();
    // }, []);

    const backToLogin = useCallback(() => {
        navigate('/login');
    }, []);


    const password = watch("password");

    return (
        <>

            <Helmet>
                <title> New Password </title>
            </Helmet>

            <div className=' grid grid-cols-2 w-full h-screen h-max-screen sm:grid-cols-1 xsm:grid-cols-1'>

                <div className='flex flex-col p-16 sm:p-9 xsm:p-9'>

                    <div className='flex items-center gap-5 mb-24 xsm:mb-16'>

                        <img src={simplifyLogo} className='xsm:w-3/6 w-1/2' />

                    </div>

                    <div className='flex flex-col '>

                        <div className='mb-8'>
                            <h4 className='xsm:text-3xl xsm:tracking-normal text-darkBlue font-semibold
                             text-3xl tracking-wider'>
                                New Password
                            </h4>
                            <p className='text-darkBlue mt-1.5'> Choose a password to begin.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>

                            <div className='flex flex-col gap-2.5'>
                                {inputField.map((fields, index) => {
                                    return (

                                        <div key={index} className='flex flex-col'>
                                           
                                            <InputField
                                                key={index}
                                                fields={fields}
                                                register={register}
                                                errors={errors}
                                                password={password}
                                            />

                                        </div>)
                                })}


                                <div className='flex items-center gap-5 my-2.5 xsm:flex-col '>
                                    <Button
                                        label={"Reset Password"}
                                        disabled={!isDirty || isSubmitting}
                                        type="submit"
                                        className={` font-semibold tracking-wide
                                             xsm:w-full  ${(!isDirty || isSubmitting) && 'opacity-50'}  bg-textColor
                                        text-white `}

                                    />
                                    <Button
                                        label={"Back to Login"}
                                        icon={arrowClockwise}
                                        className={`xsm:w-full  tracking-wide border border-searchIcon  flex font-semibold   bg-white text-textColor2`}
                                        onClick={backToLogin}
                                    />

                                </div>

                                <div>
                                    <p className='text-xs text-sectionColor'>
                                        Copyright 2024, SIMPLIFY | Simplify Business
                                    </p>
                                </div>

                            </div>
                        </form>
                    </div>

                </div >

                <div className='bg-textColor relative p-16 sm:hidden xsm:hidden'>
                    <img className='absolute top-0 left-0' src={RectangleArtSmall} alt='rectangle-art-small' />
                    <img className='absolute bottom-0 right-0' src={RectangleArtLarge} alt='rectangle-art-large' />

                    <div className='flex flex-col text-center relative justify-center items-center  z-10 h-full'>
                        {/* <div className='flex justify-center items-center'>
                            <img className='block' src={imageCombo} alt='image-combo' />
                        </div> */}
                        <div className='flex justify-center  items-center flex-col w-4/6 text-white'>
                            <h4 style={{ fontSize: '28px', lineHeight: '30px' }} className=' tracking-wide font-semibold'>
                                Start managing your business and team more efficiently.
                            </h4>
                            <p className='mt-2.5 text-sm tracking-wide'>
                                Manage and optimize Sales, Purchases, Inventory, Reporting, Users and more.

                            </p>

                        </div>
                    </div>
                </div>

            </div>



        </>

    )
}

export default NewPassword
