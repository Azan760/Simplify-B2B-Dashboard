import React, { useState, useEffect, useRef,memo } from 'react'

const SelectOptions = ({ fieldName, setValue, register, field, errors, onOptionSelect }) => {

    

    const [isOpen, setOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);

    const handleInputClick = (field) => {
        setFilteredOptions(field.selectOption);
        setOpen(!isOpen);
    }

    const handleOptionClick = (field, indexOption, option) => {

        setValue(field.inputName, option);
        setOpen(false);

         if(onOptionSelect) {
            onOptionSelect(option);
         }
    }



    const handleInputChange = (field, event) => {

        const value = event.target.value;
        const options = field.selectOption.filter((option) => {
            return (
                option.toLowerCase().includes(value.toLowerCase()))
        });

        setFilteredOptions(options);

        if (options.length === 1 && options[0].toLowerCase() === value.toLowerCase()) {
            setValue(field.inputName, options[0]);
            setOpen(false);

            if (onOptionSelect) {
                onOptionSelect(options[0]);
            }
        }


    }

    const containerRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setTimeout(() => setOpen(false), 500);

            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (

        <>
            <label className={` ${field?.label_text} font-normal flex text-sectionColor   items-center text-xs mb-1.5`}>
                {field.require &&
                    <span className='text-reds w-3 h-3 '> {field.label} </span>}
                <span className='pr-1'> {field.span} </span>
                {field.labelIcon}

            </label>

            <div ref={containerRef} className="  relative w-full ">

                {React.isValidElement(field.icon) ? field.icon : null}
                {React.isValidElement(field.icon2) ? field.icon2 : null}


                <input style={{ boxShadow: '0 0 6px #172b4d0a' }}
                    onClick={() => { handleInputClick(field) }}

                    className={`   ${errors && errors[field.inputName] ? 'focus:border-reds' : 'focus:border-textColor'} 
                         w-full outline-none py-2 px-2  ${field.paddingLeft}   rounded text-sm text-textColor2    font-normal border bg-white  `}

                    type={field.type}
                    autoComplete='off'
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    readOnly={field.readonly}
                    {...register(field.inputName, {
                        required: field.required,
                    })}

                    onChange={(e) => {
                        setValue(field.inputName, e.target.value);
                        handleInputChange(field, e)
                    }
                    }

                />

                {isOpen &&
                    <div className={` 
                         opacity-100  ${field?.styles} overflow-y-auto  bg-white border border-searchIcon
                          border-r  border-b w-full  
                   absolute top-full  left-0`} style={{ zIndex: 2000 }} >

                        {filteredOptions.length > 0 ? (
                            filteredOptions?.map((option, indexOption) => {
                                return (
                                    <div key={indexOption}
                                        onClick={() => handleOptionClick(field, indexOption, option)}
                                        className={` ${indexOption === 0 ? 'bg-textColor text-white' : 'text-black2'}  p-2.5 
                                                          hover:text-white border-b border-searchIcon hover:bg-textColor text-sm`}>
                                        <span>{option}</span>
                                    </div>)
                            })
                        ) :
                            (
                                <div className='p-2.5 text-black2 text-sm'>
                                    <span>No option found</span>
                                </div>
                            )}
                    </div>

                }
            </div>
            {errors && errors[field.inputName] &&
                <div className='flexs  items-center'>
                    <small className='text-reds  text-xs font-medium '>
                        {errors[field.inputName].message}
                    </small>
                </div>}
        </>

    )
}

export default memo(SelectOptions)
