import React from 'react'

const TextArea = ({label,register,inputName,disabled,placeholder,customClass}) => {
    return (
        <>

            <div className='flex flex-col mt-5 '>
                <label className=' font-normal flex text-sectionColor
                                 text-xs mb-1.5'> {label} </label>

                <textarea style={{ boxShadow: '0 0 6px #172b4d0a' }} type="text" cols={30} rows={4}
                    formcontrolname="description" autoComplete="description"
                    maxLength="1000" trim="blur" placeholder={placeholder} disabled={disabled}
                    className={`border-white text-sm text-browns outline-none border rounded focus:border-textColor ${customClass} p-2.5 w-full h-full`}
                    {...register(inputName)}
                />

            </div>



        </>
    )
}

export default TextArea
