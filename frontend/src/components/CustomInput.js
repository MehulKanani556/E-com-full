import React from 'react'

export default function CustomInput(props) {
    const { type, name, placeholder, classname,value ,onChange,onBlur} = props;
    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`form-control ${classname}`}
            />
        </div>
    )
}
