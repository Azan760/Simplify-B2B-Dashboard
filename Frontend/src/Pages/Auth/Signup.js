import React from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router'
import { register } from '../../Data/Data'
import { useForm } from "react-hook-form"
import Button from '../../Components/Button';
import { arrowClockwise } from '../../Components/Icons';
import RectangleArtSmall from "../../Assets/RectangleArtSmall.svg"
import RectangleArtLarge from "../../Assets/RectangleArtLarge.svg"
import { useFetch } from '../../Services/ApiService'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import simplifyLogo from "../../Assets/simplify-logo.jpeg"


const Signup = () => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isDirty } } = useForm({
  });

  const { getFetch } = useFetch();

  const onSubmit = async (data) => {

    try {
      NProgress.start();
      // await getFetch(data);
      console.log(data);
      reset();
    } catch (error) {
      console.error('Error in form submission:', error.message);
    } finally {
      NProgress.done();
    }
  }

  const navigate = useNavigate();

  return (
    <>

      <Helmet>
        <title> Register Now </title>
      </Helmet>

      <div className=' grid grid-cols-2 w-full h-screen h-max-screen sm:grid-cols-1 xsm:grid-cols-1'>

        <div className='flex flex-col  p-16 '>
          <div className='flex items-center gap-5 mb-24 xsm:mb-16'>
            <img src={simplifyLogo} className='xsm:w-3/6 w-1/2' />
          </div>

          <div className='flex flex-col'>
            <div className='mb-8'>
              <h4 className='xsm:text-3xl xsm:tracking-normal text-darkBlue
               font-semibold text-3xl tracking-wider'> Sign up </h4>
              <p className='text-darkBlue text-lg mt-1.5'> Please enter your email address. </p>
              <p className='text-textColor2 text-sm'> We will send you a registration link on your email address. </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>

              <div className='flex flex-col gap-2.5'>
                <div className='flex flex-col'>

                  <div className='  flex   relative  items-center w-full'>

                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      className="bi bi-envelope absolute text-searchIcon top-2.5 left-2" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                    </svg>

                    <input style={{ boxShadow: '0 0 6px #172b4d0a' }}
                      className={`pl-8 outline-none py-2 px-2  w-[80%]
                     rounded text-sm text-textColor2 font-normal border
                      ${errors.email ? 'focus:border-reds' : 'focus:border-textColor'}    `}
                       type="email" placeholder="Email"

                      {...register("email", {
                        required: "Email is required.",
                        minLength: {
                          value: 4,
                          message: "Email is required to be at least 4 character.",
                        },

                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Email can only contain letters and digits",
                        }

                      })} />

                  </div>
                  {
                    errors.email &&
                    <div className='flexs  items-center'>
                      <small className='text-reds  text-xs font-medium '>
                        {errors["email"].message}

                      </small>
                    </div>
                  }
                </div>

              </div>

              <div className='flex items-center gap-5 my-4 xsm:flex-col '>
                <Button
                  label={"Sign up"}
                  disabled={!isDirty || isSubmitting}
                  type="submit"
                  className={` font-semibold tracking-wide xsm:w-full  ${(!isDirty || isSubmitting) && 'opacity-50'}  bg-textColor
                    text-white `}
                />
                
                <Button
                  label={"Back to Login"}
                  onClick={() => { navigate("/login") }}
                  icon={arrowClockwise}
                  className={`xsm:w-full  tracking-wide border border-searchIcon  flex font-semibold   bg-white text-textColor2`}


                />

              </div>
            </form>
          </div>

          <div className='mt-24'>
            <p className='text-xs text-sectionColor'>
              Copyright 2024, Simplify Business
            </p>
          </div>


        </div>
        <div className='bg-textColor relative p-16 sm:hidden xsm:hidden'>
          <img className='absolute top-0 left-0' src={RectangleArtSmall} alt='rectangle-art-small' />
          <img className='absolute bottom-0 right-0' src={RectangleArtLarge} alt='rectangle-art-large' />

          <div className='flex flex-col text-center relative items-center justify-center  z-10 h-full'>
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

export default Signup
