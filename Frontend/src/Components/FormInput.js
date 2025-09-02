import React from 'react'
import SelectOptions from './SelectOptions';

const FormInput = ({ fieldData, setValue, register, errors, className}) => {

    return (
        <>
            {fieldData.map((fields, index) => {
                return (

                    <div key={index} className={`  flex flex-col ${className}`}>
                           <label className={` font-normal flex text-sectionColor
                                items-center text-xs mb-1.5`}>

                          {fields.require &&
                                <span className='text-reds w-3 h-3 '> {fields.label} </span>}
                            <span className='pr-1'> {fields.span} </span>
                            {fields.labelIcon}

                        </label>

                        <div className={`flex ${index === 7 || index === 8 ? "flex-col" : ""}`}>

                            <div className='  flex  relative  items-center w-full'>
                                {fields.isSelect ? (

                                    <SelectOptions
                                        setValue={setValue} register={register}
                                        field={{
                                            type: fields.type,
                                            placeholder: fields.placeholder,
                                            inputName: fields.inputName,
                                            selectOption: fields.selectOption,
                                              styles : fields?.styles
                                        }}
                                           icon={fields.icon}
                                           icon2={fields.icon2}
                                            index={index}

                                    />
                                ) :

                                    (
                                        <>

                                        {/* input Icon! */}

                                            {fields.icon}

                                            <input style={{ boxShadow: '0 0 6px #172b4d0a' }}
                                                className={` ${fields.disabled ? fields.disabled : 'bg-white'} w-full outline-none py-2 px-2 
                                             ${fields.paddingLeft} rounded text-sm text-textColor2 font-normal border
                                            ${errors[fields.inputName] ? 'focus:border-reds' : 'focus:border-textColor'}   ${fields.upperCase}   `}

                                                type={fields.types}
                                                placeholder={fields.placeholder}
                                                disabled={fields.disabled}
                                                readOnly={fields.readonly}

                                                {...register(fields.inputName, {
                                                    required: fields.required,
                                                    ValueAsNumber: fields.number,

                                                    minLength: {
                                                        value: fields.size,
                                                        message: fields.message,
                                                    },

                                                    max: {
                                                        value: fields.max,
                                                        message: fields.message,

                                                    },

                                                    pattern: {
                                                        value: fields.pattern,
                                                        message: fields.message2,
                                                    }

                                                })} />  </>

                                    )}

                            </div>


                            {/* {fields.selection && <div className={` flex  relative w-full`}>
                                {fields.icon2}
                                <input style={{ boxShadow: '0 0 6px #172b4d0a' }}
                                    className=' text-sm text-white w-full outline-none  py-2 px-2.5
                                     rounded placeholder:text-sm
                                         font-normal border bg-darkBlue placeholder:text-white
                                          focus:border-white '
                                    type='text' placeholder='British Pound Sterling | &pound;' />
                            </div>} */}
                        </div>

                        {/* Show  form validation error */}
                        {errors[fields.inputName] &&
                            <div className='flexs  items-center'>
                                <small className='text-reds  text-xs font-medium '>
                                    {errors[fields.inputName].message}
                                </small>
                            </div>}
                    </div>)
            })}



        </>


    )
}

export default FormInput