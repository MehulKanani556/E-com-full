import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBrands } from '../features/brand/brandSlice';
export default function Addbrand() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { brands, isSuccess, isError, isLoading, message } = useSelector((state) => state.brand);
    useEffect(() => {
        if (isSuccess) {
            toast.success('Brand Added Successfully');
        }
        if (isError) {
            toast.error(message || 'Something went wrong');
        }

    }, [isSuccess, isError, isLoading]);
    let schema = Yup.object({
        title: Yup.string().required('Brand Name is required'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            // console.log(values)
            dispatch(createBrands(values));
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/brand-list');
            }, 3000);

            // dispatch(login(values))
        },
    });
    return (
        <div>
            <h3 className="mb-4 title">Add Brand</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>

                    <CustomInput
                        type="text"
                        name="title"
                        label="Enter Brand"
                        val={formik.values.title}
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')} />
                    <div className="error">
                        {formik.touched.title && formik.errors.title && <div >{formik.errors.title}</div>}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">Add Brand</button>
                </form>
            </div>
        </div>
    );
}
