import React from 'react'

export default function Color({ data,setColor }) {
    console.log(data)
    return (
        <>
            <ul className='colors ps-0'>
                {data && data.map((color, index) => (
                    <li key={index} onClick={(e)=>setColor(data?._id)} style={{ backgroundColor: color?.title }}></li>
                ))}

            </ul>
        </>
    )
}
