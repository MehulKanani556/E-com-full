import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

const schema = yup.object({
  firstname: yup.string().required('First Name is required'),
  lastname: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  mobile: yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Mobile Number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
})
export default function Signup() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      password: ''
    },
    validationSchema: schema,

    onSubmit: (values) => {
      dispatch(registerUser(values));
      formik.resetForm();
    }

  })
  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title={'Sign Up'} />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row gx-0">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Sign Up</h3>
              <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                <CustomInput
                  value={formik.values.firstname}
                  onChange={formik.handleChange('firstname')}
                  onBlur={formik.handleBlur('firstname')}
                  type="text" name='firstname' placeholder='First Name' />

                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname && <div >{formik.errors.firstname}</div>}
                </div>

                <CustomInput
                  value={formik.values.lastname}
                  onChange={formik.handleChange('lastname')}
                  onBlur={formik.handleBlur('lastname')}
                  type="text" name='lastname' placeholder='Last Name' />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname && <div >{formik.errors.lastname}</div>}
                </div>

                <CustomInput
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  type="email" name='email' placeholder='Email' />
                <div className="error">
                  {formik.touched.email && formik.errors.email && <div >{formik.errors.email}</div>}
                </div>


                <CustomInput
                  value={formik.values.mobile}
                  onChange={formik.handleChange('mobile')}
                  onBlur={formik.handleBlur('mobile')}
                  type="tel" name='mobile' placeholder='Mobile Number' />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile && <div >{formik.errors.mobile}</div>}
                </div>

                <CustomInput
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  type="password" name='password' placeholder='Password' />
                <div className="error">
                  {formik.touched.password && formik.errors.password && <div >{formik.errors.password}</div>}
                </div>



                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center ">
                  <button className="button border-0" type="submit">SignUp</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
