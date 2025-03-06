import React,{useCallback} from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { saleClientDetail, saleInvoiceDetail, saleProduct } from '../Data/Data';
import FormInput from './FormInput';
import { useDate } from './Date';
import { useNavigate } from 'react-router';
import DynamicField from './DynamicField';
import { arrowClockwise, arrowLeft, back } from './Icons';
import Button from './Button';
import TextArea from './TextArea';
import '../Css/NewInvoiceEstimates.css'


const NewInvoiceEstimates = ({ title, navigatePath, inputHeader }) => {


    const [, formattedDateForInput, formattedDueDateForInput] = useDate();
    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting, isDirty },
        reset,
        setValue

    } = useForm(
        {
            defaultValues: {

                date: formattedDateForInput,
                dueDate: formattedDueDateForInput,
                vatType: "Standard VAT",
                Product: [],
                notes: "Custom Invoice Note Added from Settings."
            },

        },
    );

    const { fields, append, remove } = useFieldArray({ control, name: "Product" });


    const onSubmit = async (data) => {

        try {
    
            reset();
        } catch (error) {
            console.error('Error in form submission:', error.message);
        }
    };

    const handleAddProduct = () => {
        // append({ assignUser: '', purchasePrice: '', salePrice: '', profit: '' });
    };


    const handleNavigate = useCallback(() => {
        navigate(navigatePath);
      }, [navigate, navigatePath]);



    return (

        <>

            <div style={{ height: "calc(100% - 60px)" }}>
                <div className="heading mb-5 gap-2.5  items-center flex sm:justify-center 
                xsm:justify-center">
                    <span     onClick={() => {navigate(navigatePath)}} 
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
                            className='client-Detail grid gap-3 mb-5 sm:grid-cols-1 xsm:grid-cols-1'>
                            <div
                                className=' grid gap-3 grid-cols-2 sm:grid-cols-1 xsm:grid-cols-1'>

                                <FormInput
                                    fieldData={saleClientDetail} register={register} errors={errors}
                                    setValue={setValue}
                                />

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

                        <div
                            className='grid gap-3 sm:grid-cols-1 xsm:grid-cols-1 grid-cols-3'>
                            <FormInput fieldData={saleInvoiceDetail} register={register}
                                errors={errors} setValue={setValue} />

                        </div>

                    </div>

                    <div className='mb-5 xsm:overflow-x-auto'>

                        <DynamicField fieldConfig={saleProduct} register={register} errors={errors}
                            fields={fields} remove={remove} append={append} fieldName="Product"
                        />

                    </div>


                    <div className=' grid-cols-[3fr_2fr] grid gap-5 xsm:grid-cols-1'>
                        <div className='grid gap-5 grid-cols-1'>

                            <TextArea label="Additional Notes" inputName="notes" register={register} />

                            <TextArea label="Payment Terms" inputName="paymentTerms" register={register} />

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
