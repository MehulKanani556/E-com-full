
import React from 'react'

export default function CustomInput(props) {
    const { type, label, i_id, i_class, name, val, onCh, onBl } = props;
    return (
        <div className="form-floating mt-3">
            <input type={type} className={`form-control ${i_class}`} value={val} name={name} id={i_id} placeholder={label} onChange={onCh} onBlur={onCh} />
            <label htmlFor={label}>{label}</label>
        </div>
    )

}
