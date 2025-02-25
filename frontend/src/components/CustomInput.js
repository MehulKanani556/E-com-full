import React from 'react'

export default function CustomInput(props) {
    const { type, name, placeholder, classname } = props;
    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`form-control ${classname}`}
            />
        </div>
    )
}
