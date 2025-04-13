import React from 'react'

export default function Color({ data, setColor }) {
    return (
        <>
            <ul className='colors ps-0'>
                {data && data.map((color, index) => (
                    <li 
                        key={index} 
                        onClick={() => setColor(color?._id)} 
                        style={{ backgroundColor: color?.color }} 
                        className="color-item"
                    ></li>
                ))}
            </ul>
        </>
    )
}
