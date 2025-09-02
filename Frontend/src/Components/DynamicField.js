import React, { useEffect, useState, useCallback } from 'react'
import Button from './Button'
import { plus, plus1, trash } from './Icons'
import SelectOptions from './SelectOptions';


const DynamicField = ({
    setValue, watch, fieldName, fieldConfig, allProduct,

    register, errors, remove, fields, append,setGrossSum,setTotalQuanity, setTotalVat, setTotalAmount, 
}) => {

    const calculatedValues = (index) => {

        const purchasePrice = watch(`${fieldName}.${index}.purchasePrice`);
        const salesPrice = watch(`${fieldName}.${index}.salePrice`);
        const profit = purchasePrice > 0 && salesPrice > 0 ?
            Math.round(((salesPrice - purchasePrice) * 100) / purchasePrice) : undefined;

        return {
            profit,

        };


    };

    const [selectedProduct, setSelectedProduct] = useState("");


    const handleOptionSelect = useCallback((option, currentIndex) => {
        setSelectedProduct(option);

        const selected = allProduct?.find(
            item => item?.details?.productServiceName === option
        );

        if (selected) {
            setValue(`Product.${currentIndex}.sku`, selected.details.sku);
            setValue(`Product.${currentIndex}.unitPrice`, selected.details.salePrice);
        } else if (selectedProduct) {
            //console.log("Product not found");
        }
    }, [allProduct, selectedProduct, setValue]);

    const calculateGrossSum = (index) => {
        const quantity = watch(`${fieldName}.${index}.quantity`);
        const unitPrice = watch(`${fieldName}.${index}.unitPrice`);
        const vatRate = watch(`${fieldName}.${index}.vatRate`);

        let totalPrice = unitPrice * quantity || 0;
        const vatAmount = (totalPrice * (vatRate || 0)) / 100;
        totalPrice = totalPrice + vatAmount;

        return {
            totalPrice,
            vatAmount
        };
    };


    useEffect(() => {
        const subscription = watch((value) => {

            const total = fields.reduce((sum, _, index) => {
                const gross = parseFloat(value?.[fieldName]?.[index]?.grossTotal || 0);
                return sum + gross;
            }, 0);

            const totalQuantity = fields.reduce((sum, _, index) => {
                const quantity = parseFloat(value?.[fieldName]?.[index]?.quantity || 0);
                return sum + quantity;
            }, 0);

            const totalVat = fields.reduce((sum, _, index) => {
                const vat = parseFloat(value?.[fieldName]?.[index]?.vatAmount || 0);
                return sum + vat;
            }
                , 0);

            const totalAmount = fields.reduce((sum, _, index) => {
                const amount = parseFloat(value?.[fieldName]?.[index]?.grossTotal || 0);
                return (sum + amount) - totalVat;
            }, 0);

            if (typeof setGrossSum === 'function') {
                setGrossSum(total ?? '0');

                setGrossSum(total ?? '0');
                setTotalQuanity(totalQuantity ?? '0');
                setTotalVat(totalVat ?? '0');
                setTotalAmount(totalAmount ?? '0');
            }

        });


        return () => subscription.unsubscribe();
    }, [watch, fields, fieldName]);

    const handleInputChange = (index, fieldName, value) => {
        setValue(`${fieldName}.${index}.${fieldName}`, value);
    }





    return (
        <>

            <div className='flex flex-col mb-2.5'>

                <p className='text-base text-textColor font-semibold 
                                tracking-wider'> {fieldConfig[0].title} </p>
            </div>
            <div className='xsm:overflow-x-auto '>

                <table style={{ boxShadow: '0 0 6px #172b4d0a' }} className=' bg-white rounded border-collapse w-full '>
                    <thead className='bg-darkBlue '>

                        <tr className=''>
                            {fieldConfig[0].heading.map((head, index) => {
                                return (
                                    <th key={index} className={` ${head?.styles} text-left p-2.5 text-xs text-white font-semibold`}>
                                        {head} </th>)
                            }
                            )}
                        </tr>


                    </thead>
                    <tbody className='rounded border-searchIcon border box-border'>
                        {fields.length === 0 && (
                            <tr className=''>
                                <td style={{ height: '200px' }} className='text-center p-2.5' colSpan={10}>
                                    <h4 className=' tracking wider text-heading font-semibold text-2xl'> {fieldConfig[0].bodyTitle} </h4>
                                    <p className='mb-7 mt-1 text-sm text-textColor2'> {fieldConfig[0].description} </p>

                                    <Button
                                        type="button" icon={plus1} label={fieldConfig[0].buttonLabel}
                                        className='font-semibold  inline-block bg-textColor text-white '
                                        onClick={append} disabled={fieldConfig[0].disabled}
                                    />

                                </td>

                            </tr>)}


                        {fields.map((field, index) => {
                            const { profit } = calculatedValues(index);
                                 const {totalPrice, vatAmount} = calculateGrossSum(index);

                            profit && setValue(`${fieldName}.${index}.profit`, profit);
                              totalPrice &&   setValue(`${fieldName}.${index}.grossTotal`, totalPrice.toFixed(2));
                                vatAmount &&  setValue(`${fieldName}.${index}.vatAmount`, vatAmount);

                            return (
                                <tr key={field.id}>


                                    {fieldConfig[0].inputs.map((inputFiled, index2) => {
                                        return (
                                            <td key={index2} className='p-2.5' >
                                                <div className='flex '>

                                                    {inputFiled.isSelect ?

                                                        (
                                                            <SelectOptions

                                                                field={{
                                                                    ...inputFiled,
                                                                    inputName: `${fieldName}[${index}].${inputFiled.inputName}`,
                                                                }}

                                                                setValue={setValue} register={register}
                                                                styles={inputFiled?.styles}
                                                                errors={errors}
                                                                onOptionSelect={(option) => handleOptionSelect(option, index)} 
                                                        


                                                            />)
                                                        :

                                                        (

                                                            <input type={inputFiled.types} placeholder={inputFiled.placeholder}

                                                                className={` ${inputFiled.inputClass} w-full outline-none py-2 px-2  rounded
                                                         text-xs text-textColor2     font-normal border bg-white 
                                                         ${errors[inputFiled.inputName] ? 'focus:border-reds' : 'focus:border-textColor'}
                                                                                  
                                                        `}
                                                                {...register(`${fieldName}.${index}.${inputFiled.inputName}`, {
                                                                    ValueAsNumber: inputFiled.number

                                                                })}


                                                            />)}
                                                </div>
                                                {/* {errors?.[fieldName]?.[index]?.[inputFiled.inputName] && (
                                                    <div className='flexs  items-center'>

                                                        <small className='text-reds text-xs font-medium'>
                                                            {errors[fieldName][index][inputFiled.inputName].message}
                                                        </small>
                                                    </div>
                                                )} */}


                                                {errors[`${fieldName}.${index}.${inputFiled.inputName}`] &&
                                                    <div className='flexs  items-center'>
                                                        <small className='text-reds  text-xs font-medium '>
                                                            {errors[`${fieldName}.${index}.${inputFiled.inputName}`].message}                                                            </small>
                                                    </div>}

                                            </td>

                                        )


                                    })}

                                    <td key={index} className="p-2.5">
                                        <div className="flex gap-2.5 justify-center items-center">

                                            {index === fields.length - 1 && (
                                                <Button
                                                    type="button"
                                                    className=" bg-textColor text-white font-semibold "
                                                    onClick={append} span={'hidden'} icon={plus}
                                                />)}

                                            <Button
                                                type="button" className="font-semibold bg-reds"
                                                onClick={() => remove(index)}
                                                span={'hidden'} icon={trash}
                                            />

                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </>

    )
}

export default DynamicField

