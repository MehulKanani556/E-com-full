import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProdCategory } from '../features/pcategory/pcategorySlice';
import { createColor } from '../features/color/colorSlice';

export default function Addcolor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSuccess, isError, isLoading, message } = useSelector((state) => state.color);
    useEffect(() => {
        if (isSuccess) {
            toast.success('Color Added Successfully');
        }
        if (isError) {
            toast.error(message || 'Something went wrong');
        }

    }, [isSuccess, isError, isLoading]);
    let schema = Yup.object({
        title: Yup.string().required('Color Name is required'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            // console.log(values)
            dispatch(createColor(values));
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/color-list');
            }, 3000);

            // dispatch(login(values))
        },
    });
    return (
        <div>
            <h3 className="mb-4 title">Add Color</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>

                    <CustomInput
                        type="color"
                        label="Enter Color"
                        name="title"
                        val={formik.values.title}
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title && <div >{formik.errors.title}</div>}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">Add Color</button>
                </form>
            </div>
        </div>
    );
}
