import React, { useCallback,useEffect } from 'react'
import RectangleArtSmall from "../../Assets/RectangleArtSmall.svg"
import RectangleArtLarge from "../../Assets/RectangleArtLarge.svg"
import { Helmet } from "react-helmet";
import simplifyLogo from "../../Assets/simplify-logo.jpeg"
import { useForm } from "react-hook-form"
import Button from '../../Components/Button';
import { arrowClockwise } from '../../Components/Icons';
import { Link } from 'react-router-dom';
import InputField from '../../Components/InputField.js';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../Features/AuthSlice.js";
import { useNavigate } from 'react-router'
import NProgress from 'nprogress';






const Login = () => {

     const navigate = useNavigate(); 

    const dispatch = useDispatch();
      const { token, user, loading, error } = useSelector((state) => state.auth);
      const storedToken = localStorage.getItem("userToken");
       const tokens = token || storedToken;


    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm({
        defaultValues: {
            rememberMe: true,
        },

    });

    const inputField = [
        {
            label : "Email",
            paddingLeft : "pl-8",
            placeholder: "Email",
            required: "Email is required.",
            pattern : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            types: 'email',
            inputName: "email",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className="bi bi-envelope absolute text-searchIcon top-2.5 left-2" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>,
            message2: "Email can only contain letters and digits",
            message: "Email is required to be at least 4 character.",
        }, {
            label : "Password",
            paddingLeft : "pl-8",
            placeholder: "Password",
            types: 'password',
            required: "Password is required",
            inputName: "password",
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                className=" absolute text-searchIcon top-2.5 left-2 bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
            </svg>,
            pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
            message2: "Password must contain at least 1 number, 1 uppercase, and 1 lowercase letter.",


        }
    ];


    useEffect(() => {
        if (tokens ) {
            navigate("/", {replace: true});
            NProgress.done();
        }
    }, [token, user, navigate]);

    useEffect(() => {
        if (tokens) {
            reset();
        }
    }, [token, reset]);

    useEffect(() => {
        if (error) {
            alert(error.message);
        }
      
    }, [loading, error]);



    const onSubmit =  (data) => {
        console.log(data);

        dispatch(loginUser(data));
        NProgress.start();

    }

    const handleReset = useCallback(() => {
        reset();
    }, []);

    return (
        <>

            <Helmet>
                <title> Login </title>
            </Helmet>


            <div className=' grid grid-cols-2 w-full h-screen h-max-screen sm:grid-cols-1 xsm:grid-cols-1'>

                <div className='flex flex-col p-16 sm:p-9 xsm:p-9'>

                    <div className='flex items-center gap-5 mb-24 xsm:mb-16'>

                        <img src={simplifyLogo} className='xsm:w-3/6 w-1/2' />

                    </div>

                    <div className='flex flex-col '>

                        <div className='mb-8'>
                            <h4 className='xsm:text-3xl xsm:tracking-normal text-darkBlue font-semibold text-3xl tracking-wider'> Welcome Back, </h4>
                            <p className='text-darkBlue mt-1.5'> Please enter your email and password. </p>
                        </div>


                        <form onSubmit={handleSubmit(onSubmit)} noValidate>

                            <div className='flex flex-col gap-2.5'>
                                {inputField.map((fields, index) => {
                                    return (

                                        <div key={index} className='flex flex-col'>


                                            <label className=' font-normal flex text-sectionColor items-center text-xs mb-1.5'>
                                                <span className='pr-1'> {fields.label}  </span>
                                            </label>

                                            <InputField key={index} fields={fields}
                                             register={register} errors={errors} />

                                        </div>)


                                })}

                                <div className='flex  items-center gap-2.5'>
                                    <input {...register("rememberMe")}

                                        className="form-checkbox h-5 w-5 text-textColor border border-gray-300 rounded focus:ring-textColor"
                                        defaultChecked type="checkbox" />
                                    <span className='text-xs text-sectionColor' > Remember me </span>
                                </div>

                                <div className='flex items-center gap-5 my-2.5 xsm:flex-col '>
                                    <Button
                                        label={"Login"}
                                        disabled={!isDirty || isSubmitting}
                                        type="submit" onSubmit={handleReset}
                                        className={` font-semibold tracking-wide xsm:w-full  ${(!isDirty || isSubmitting) && 'opacity-50'}  bg-textColor
                                  text-white `}

                                    />
                                    <Button
                                        label={"Reset Password"}
                                        icon={arrowClockwise}
                                        className={`xsm:w-full  tracking-wide border border-searchIcon  flex font-semibold   bg-white text-textColor2`}
                                    />

                                </div>

                                <p className='flex items-center gap-1 text-xs xsm:mb-20 mb-24'>
                                    <span className='text-sectionColor'> Don't have an account? </span>
                                    <Link to="/signup" className='text-downIcon flex gap-1 items-center' >
                                        <span >
                                            Register Here
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                        </svg>
                                    </Link>

                                </p>

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


            </div >


        </>

    )
}

export default Login
