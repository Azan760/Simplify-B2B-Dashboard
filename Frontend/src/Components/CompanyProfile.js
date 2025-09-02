import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { companyProfile } from '../Data/Data';
import SelectOptions from './SelectOptions';
import InputField from './InputField';
import { useFile } from '../Pages/Dashboard/Team/Data'
import { uploadIcon, editIcon } from './Icons'
import TextArea from './TextArea';
import FormInput from './FormInput';
import { location1, location2 } from '../Pages/Dashboard/Sale/Data';




const CompanyProfile = () => {

    const navigate = useNavigate();



    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue,
        watch

    } = useForm();
    const [onFileChange, fileInputRef, resetFileInput, triggerFileInput, imagePreview]
        = useFile(setValue);

     const setAddress = (event) => {

    const value = event.target.checked;

    if (value) {
      setValue("shipCity", watch("billCity"));
      setValue("shipState", watch("billState"));
      setValue("shipCountry", watch("billCountry"));
      setValue("shipZipCode", watch("billZipCode"));
      setValue("shipAddress1", watch("billAddress1"));
      setValue("shipAddress2", watch("billAddress2"));
    }
  }

    async function onSubmit(data) {
        console.log(data);


        try {

            reset();
        } catch (error) {
            console.error('Error in form submission:', error.message);
        }
    }

    return (
        <>

            <div style={{ height: "calc(100% - 60px)" }}>
                <div className="heading mb-5 gap-2.5  items-center flex sm:justify-center    xsm:justify-center">
                    <h6 style={{ letterSpacing: '1px', fontSize: '32px' }} className="font-semibold
                     text-heading    xsm:text-lg"> Company Profile </h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate >

                    <div className='xsm:overflow-x-auto  grid-cols-[3fr_1fr] xsm:grid-cols-1 grid gap-5'>
                        <div>
                            <div className='grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 mb-3 grid gap-3'>
                                {
                                    companyProfile.map((fields, index) => {
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

                        <div style={{ boxShadow: '0 0 6px #172b4d0a', height: '250px', width: '250px' }} className={` xsm:m-auto mb-5 ${imagePreview ? `  border-8 bg-white ` : 'border-8'
                            } relative shadow-sideShadow flex justify-center bg-white items-center  rounded  border-white`}>

                            {imagePreview ? (
                                <img src={imagePreview}
                                    alt="Selected" style={{
                                        maxHeight: '100%', maxWidth: '100%',
                                        borderRadius: '4px'
                                    }} />
                            ) :
                                (<span onClick={triggerFileInput} >
                                    {uploadIcon}
                                </span>)}

                            {imagePreview &&

                                <span onClick={triggerFileInput} className='absolute top-64 border-2
                                                    border-white bg-bgColor3 w-9 h-9 rounded-full'>
                                    {editIcon}
                                </span>}

                            <input
                                type="file" hidden={true} accept="image/*" {...register("userImage")}
                                onChange={onFileChange} ref={fileInputRef}

                            />

                        </div>



                    </div>

                    <div>

                        <TextArea label="About Company" customClass="h-36" inputName="about" register={register} />

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
                                                <input type="checkbox" className='border-0' onChange={setAddress} />
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
                                                            register={register} setValue={setValue} errors={errors} fieldData={field2.address} className={'mb-2.5'}
                                                        />

                                                    </div>))
                                        })}
                                </div>
                            )
                        })}
                    </div>



                </form>

                <div className="mt-5 pb-7 h-full w-full">
                    <p className="text-textColor font-semibold text-base pb-5 border-b-2 border-gray-200">
                        Recent History
                    </p>

                    <div className="bg-white mt-5 rounded-lg p-4 shadow-sideShadow">
                        <div className="flex gap-4 relative pb-6">
                            <div className="flex flex-row">
                                <div className='flex flex-col items-center w-20'>
                                    <p className="text-sm font-bold text-gray-800"></p>
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
                                    last updated by <span className="text-blue-600 font-semibold cursor-pointer"></span>
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 relative">
                            <div className="flex flex-row">
                                <div className='flex flex-col items-center w-20'>
                                    <p className="text-sm font-bold text-gray-800"></p>
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
                                    created by <span className="text-blue-600 font-semibold cursor-pointer"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </>
    )
}

export default CompanyProfile
