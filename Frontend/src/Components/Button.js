import React from 'react'
import { memo } from 'react'

const Button = ({ onClick, disabled, type, label, className, icon, span }) => {




    return (

        <>
            <button type={type} disabled={disabled} onClick={onClick}
                className={` font-semibold  items-center gap-1.5 ${disabled ? 'opacity-50' : ''} 
              ${className} justify-center p-2.5 rounded text-sm shadow hover:shadow-textColor3`} >
                {icon}
                <span className={`${span}`}> {label} </span>
            </button>


        </>


    )
}

export default memo(Button)
