import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBlogCategory, getBlogCategory, updateBlogCategory } from '../features/bcategory/bcategorySlice';

export default function Addblogcat() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { bCategory, isSuccess, isError, isLoading, message } = useSelector((state) => state.bcategory);
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getBlogCategory(id));
        }
    }, [id]);
    useEffect(() => {
        if (isSuccess) {
            toast.success('Blog Category Added Successfully');
        }
        if (isError) {
            toast.error(message || 'Something went wrong');
        }

    }, [isSuccess, isError, isLoading]);
    let schema = Yup.object({
        title: Yup.string().required('Blog Category is required'),
    });
    const formik = useFormik({
        initialValues: {
            title: bCategory.title || '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (id) {
                dispatch(updateBlogCategory({ id, ...values }));
            } else {
                dispatch(createBlogCategory(values));
            }
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/blog-category-list');
            }, 3000);

            // dispatch(login(values))
        },
    });
    useEffect(() => {
        if (bCategory.title && id) {
            formik.setFieldValue('title', bCategory.title);
        }
    }, [bCategory]);
    return (
        <div>
            <h3 className="mb-4 title">{id ? 'Edit' : 'Add'} Blog Category</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>

                    <CustomInput
                        type="text"
                        label="Enter Blog Category"
                        name="title"
                        val={formik.values.title}
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title && <div >{formik.errors.title}</div>}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">{id ? 'Edit' : 'Add'} Blog Category</button>
                </form>
            </div>
        </div>
    );
}
