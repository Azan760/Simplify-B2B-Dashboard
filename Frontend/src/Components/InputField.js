import React from 'react'

const InputField = ({ fields, register, errors, password }) => {



    return (

        <>


            <label className=' font-normal flex text-sectionColor   items-center text-xs mb-1.5'>
                {fields.require &&
                    <span className='text-reds w-3 h-3 '> {fields.label} </span>}
                <span className='pr-1'> {fields.span} </span>
                {fields.labelIcon}

            </label>

            <div className="flex   relative  items-center w-full">

                {fields.icon}

                <input style={{ boxShadow: '0 0 6px #172b4d0a' }}
                    className={`
                                ${fields.disabled ? fields.disabled : 'bg-white'} w-full outline-none py-2 px-2 
                                ${fields.paddingLeft} rounded text-sm text-textColor2 font-normal border
                                ${fields.upperCase} ${errors[fields.inputName] ? 'focus:border-reds' : 'focus:border-textColor'}  `}

                    type={fields.types}
                    placeholder={fields.placeholder}
                    disabled={fields.disabled}
                    readOnly={fields.readonly}
                    autoComplete="off"


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
                        },
                        validate: fields.inputName === "confirmPassword" ?
                            (value) => value === password || "Passwords do not match" : undefined,

                    })}


                />

            </div>

            {errors[fields.inputName] &&
                <div className='flexs  items-center'>
                    <small className='text-reds  text-xs font-medium '>
                        {errors[fields.inputName].message}
                    </small>
                </div>}


        </>
    )
}

export default InputField
