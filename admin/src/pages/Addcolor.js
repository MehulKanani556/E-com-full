import React from 'react';
import CustomInput from '../components/CustomInput';

export default function Addcolor() {
    return (
        <div>
            <h3 className="mb-4 title">Add Color</h3>
            <div className="">
                <form action="">

                    <CustomInput type="color" label="Enter Color" />
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">Add 1Color</button>
                </form>
            </div>
        </div>
    );
}
