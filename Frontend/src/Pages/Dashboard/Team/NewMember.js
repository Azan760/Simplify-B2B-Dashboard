import React from 'react'
import { calendar, arrowClockwise, arrowLeft, uploadIcon, editIcon } from '../../../Components/Icons'
import { useDate } from '../../../Components/Date'
import { useForm } from 'react-hook-form'
import { useFile, userDetail, dynamic_User_Field } from './Data'
import Button from '../../../Components/Button'
import { useNavigate } from 'react-router'
import { back } from '../../../Components/Icons'
import InputField from '../../../Components/InputField'
import SelectOptions from '../../../Components/SelectOptions'
import { useFetch } from '../../../Services/ApiService'
import { useSelector } from 'react-redux'


const NewMember = () => {


    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting, isDirty },
        reset,

    } = useForm();
    
    const { postFetchFile } = useFetch("http://localhost:8000/team/new");
    const user = useSelector((state) => state.auth.user);
    const [formattedDate] = useDate();
    const navigate = useNavigate();
    const [onFileChange, fileInputRef, resetFileInput, triggerFileInput, imagePreview] = useFile(setValue);



    const onSubmit = async (data) => {

        data = { ...data, createdBy: { id: user?._id, name: user?.fullName } };
        console.log(data);
        try {
            await postFetchFile(data);
            resetFileInput();
            reset();

        }
        catch (error) {
            console.log("Error : ", error.message);
        }

    }

    return (

        <>

            <div style={{ height: "calc(100% - 60px)" }}>
                <div className="heading mb-5 gap-2.5 sm:mb-8 xsm:mb-8  
                items-center flex sm:justify-center     xsm:justify-center">
                    <span onClick={() => { navigate('/Team/AllMember') }}
                        className='border border-textColor2 rounded p-2 shadow-sideShadow'>
                        {back}
                    </span>
                    <h6 style={{ letterSpacing: '1px' }} className="font-semibold text-heading  text-xl  xsm:text-lg">
                        Add New Member
                    </h6>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='mb-3.5'>
                        <div className='flex justify-between   sm:flex-col sm:gap-5 xsm:gap-5 xsm:flex-col  mb-2.5'>
                            <div className='flex items-center'>
                                <p className='text-base text-textColor font-semibold tracking-wider'> User Details: </p>
                            </div>

                            <div className='flex sm:flex-col sm:items-start xsm:items-start xsm:flex-col sm:gap-2.5 xsm:gap-2.5'>
                                <div className={`flex items-center   mr-5 `}>
                                    <label className={`my-0.5 mx-2   text-sectionColor text-xs`}>
                                        <span className='text-reds w-3 h-3 '> * </span>
                                        Active
                                    </label>
                                    <input {...register("active")} defaultChecked type="checkbox"
                                        className="toggle-btn" />

                                </div>
                                <div className={`flex items-center   rounded py-2 px-3.5  bg-textColor2 text-white 
                                    font-semibold`}>
                                    {calendar}
                                    <span className=' text-sm ml-2.5'> {formattedDate} </span>

                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='xsm:overflow-x-auto  grid-cols-[3fr_1fr] xsm:grid-cols-1 grid gap-5'>
                        <div>
                            <div className='grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1 mb-3 grid gap-3'>
                                {
                                    userDetail.map((fields, index) => {
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

                                {console.log(watch("userType"))}

                                {dynamic_User_Field.map((fields, index) => {
                                    return (

                                        (watch("userType") === "Sales Manager" || watch("userType") === "Sales Person") &&
                                        (<div key={index} className={`flex flex-col`}>

                                            {fields.isSelect ?

                                                (<SelectOptions field={fields} setValue={setValue} register={register}
                                                    errors={errors} />)
                                                :
                                                (<InputField fields={fields} errors={errors}
                                                    register={register} />
                                                )
                                            }
                                        </div>)
                                    )

                                })}

                            </div>

                        </div>

                        <div style={{ height: '250px', width: '250px' }} className={` xsm:m-auto mb-5 ${imagePreview ? `  border-8 bg-white ` : 'border-8'
                            } relative shadow-sideShadow flex justify-center items-center  rounded  border-white`}>

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

                    <div className='pb-5 pt-5'>
                        <div className='flex justify-between button'>

                            <Button
                                type="button" label="Back" onClick={() => { navigate('/Team/AllMember') }}
                                icon={arrowLeft}
                                className={` flex  border border-searchIcon bg-white text-textColor2`}
                            />

                            <div className='flex button'>
                                <Button
                                    type="reset" label="Reset" disabled={!isDirty || isSubmitting}
                                    icon={arrowClockwise} className={` flex  ${(!isDirty || isSubmitting) && 'opacity-50'} border border-searchIcon   bg-white text-textColor2`}
                                />
                                <Button
                                    type="submit" label="Submit" onSubmit={reset} disabled={!isDirty || isSubmitting}
                                    className={` ${(!isDirty || isSubmitting) && 'opacity-50'} inner-btn  bg-textColor text-white  ml-2.5`}
                                />
                            </div>

                        </div>
                    </div>

                </form>

            </div>
        </>

    )
}

export default NewMember
