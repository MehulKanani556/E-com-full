import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBrands, getBrand, updateBrands } from '../features/brand/brandSlice';
export default function Addbrand() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); 
    
    const { brands, brand,isSuccess, isError, isLoading, message } = useSelector((state) => state.brand);
    useEffect(() => {
        if(id !== undefined) {
            dispatch(getBrand(id));
        }
    }, [id]);
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
            title: id?brand.title :'',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (id) { // Check if id is available
                dispatch(updateBrands({ id, ...values })); // Call updateBrand if id exists
            } else {
                dispatch(createBrands(values)); // Call createBrands if no id
            }
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/brand-list');
            }, 3000);

            
        },
    });

    useEffect(() => {
        if (brand.title && id) {
            formik.setFieldValue('title', brand.title);
        }
    }, [brand]);

    return (
        <div>
            <h3 className="mb-4 title"> {id?'Edit':'Add'} Brand</h3>
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
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 "> {id?'Edit':'Add'} Brand</button>
                </form>
            </div>
        </div>
    );
}
