import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCoupon, getCoupon, updateCoupon } from '../features/coupon/couponSlice';
export default function Addcoupon() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isSuccess, isError, isLoading, message, coupon } = useSelector((state) => state.coupon);
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getCoupon(id));
        }
    }, [id]);
    useEffect(() => {
        if (isSuccess) {
            toast.success('Coupon Added Successfully');
        }
        if (isError) {
            toast.error(message || 'Something went wrong');
        }

    }, [isSuccess, isError, isLoading]);
    let schema = Yup.object({
        name: Yup.string().required('Coupon Name is required'),
        expiry: Yup.date().required('Expiry Date is required'),
        discount: Yup.number().required('Discount is required'),
    });
    const formik = useFormik({
        initialValues: {
            name: coupon.name || '',
            expiry: coupon.expiry || '',
            discount: coupon.discount || '',
        },
        validationSchema: schema,
        onSubmit: values => {
            if (id) {
                dispatch(updateCoupon({ id, ...values }));
            } else {
                dispatch(createCoupon(values));
            }
            formik.resetForm();
            setTimeout(() => {
                navigate('/admin/coupon-list');
            }, 2000);

            // dispatch(login(values))
        },
    });
    useEffect(() => {
        if (coupon.name && id) {
            formik.setFieldValue('name', coupon.name);
        }
        if (coupon.expiry && id) {
            const formattedExpiry = new Date(coupon.expiry).toISOString().split('T')[0];
            formik.setFieldValue('expiry', formattedExpiry);
        }
        if (coupon.discount && id) {
            formik.setFieldValue('discount', coupon.discount);
        }
    }, [coupon]);
    return (
        <div>
            <h3 className="mb-4 title">{id ? 'Edit' : 'Add'} Coupon</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>

                    <CustomInput
                        type="text"
                        name="name"
                        label="Enter Coupon Name"
                        val={formik.values.name}
                        onCh={formik.handleChange('name')}
                        onBl={formik.handleBlur('name')} />
                    <div className="error">
                        {formik.touched.name && formik.errors.name && <div >{formik.errors.name}</div>}
                    </div>
                    <CustomInput
                        type="date"
                        name="expiry"
                        label="Enter Expiry Date"
                        val={formik.values.expiry}
                        onCh={formik.handleChange('expiry')}
                        onBl={formik.handleBlur('expiry')} />
                    <div className="error">
                        {formik.touched.expiry && formik.errors.expiry && <div >{formik.errors.expiry}</div>}
                    </div>
                    <CustomInput
                        type="number"
                        name="discount"
                        label="Enter Discount "
                        val={formik.values.discount}
                        onCh={formik.handleChange('discount')}
                        onBl={formik.handleBlur('discount')} />
                    <div className="error">
                        {formik.touched.discount && formik.errors.discount && <div >{formik.errors.discount}</div>}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">{id ? 'Edit' : 'Add'} Coupon</button>
                </form>
            </div>
        </div>
    );
}
