import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice'
const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
})
export default function Login() {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,

        onSubmit: (values) => {
            dispatch(login(values));
            formik.resetForm();
        }

    })
    return (
        <>
            <Meta title="Login" />
            <BreadCrumb title={'Login'} />
            <Container class1="login-wrapper home-wrapper-2 py-5">
                <div className="row gx-0">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="title text-center mb-3">Login</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')}
                                    type="email" name='email' placeholder='Email' />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email && <div >{formik.errors.email}</div>}
                                </div>

                                <CustomInput
                                    value={formik.values.password}
                                    onChange={formik.handleChange('password')}
                                    onBlur={formik.handleBlur('password')}
                                    type="password" name='password' placeholder='Password' />
                                <div className="error">
                                    {formik.touched.password && formik.errors.password && <div >{formik.errors.password}</div>}
                                </div>


                                <div>
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </div>
                                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center ">
                                    <button type="submit" className="button border-0">Login</button>
                                    <Link to="/signup" className='button signup'>SignUp</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
