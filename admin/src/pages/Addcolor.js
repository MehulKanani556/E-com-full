import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProdCategory } from '../features/pcategory/pcategorySlice';
import { createColor, getColor, updateColor } from '../features/color/colorSlice';

export default function Addcolor() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); 
    const { isSuccess, isError, isLoading, message,color } = useSelector((state) => state.color);
    useEffect(() => {
        if(id !== undefined) {
            dispatch(getColor(id));
        }
    }, [id]);
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
            title: color.title || '',
        },
        validationSchema: schema,
        onSubmit: values => {
            // console.log(values)
            if(id){
                dispatch(updateColor({id,...values}));
            }else{
                dispatch(createColor(values));
            }
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/color-list');
            }, 3000);

            // dispatch(login(values))
        },
    });
    useEffect(() => {
        if (color.title && id) {
            formik.setFieldValue('title', color.title);
        }
    }, [color]);
    return (
        <div>
            <h3 className="mb-4 title">{id?'Edit':'Add'} Color</h3>
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
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">{id?'Edit':'Add'} Color</button>
                </form>
            </div>
        </div>
    );
}
