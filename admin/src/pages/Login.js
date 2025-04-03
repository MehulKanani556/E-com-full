import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice'
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoding, isError, isSuccess, message } = useSelector((state) => state.auth);
  let userSchema = Yup.object({
    email: Yup.string().email('Email should be valid').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: values => {
      dispatch(login(values))
    },
  });

  useEffect(() => {
    if (!user == null || isSuccess) {      
      navigate('admin')
    }
  }, [user, isLoding, isError, isSuccess, message]);
  return (
    <div className='py-5' style={{ backgroundColor: "#ffd333", minHeight: '100vh' }}>

      <div className='my-5 w-25 bg-white mx-auto rounded-3 p-4 '>
        <h3 className='text-center title'>Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className="error text-center">
          {message == "Rejected" ? "You are not an Admin" : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type='text'
            name='email'
            label='Email'
            id='email'
            val={formik.values.email}
            onCh={formik.handleChange('email')}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email && <div >{formik.errors.email}</div>}
          </div>

          <CustomInput
            type='password'
            name='password'
            label='Password'
            id='password'
            val={formik.values.password}
            onCh={formik.handleChange('password')}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password && <div >{formik.errors.password}</div>}
          </div>


          <div className="mb-4 text-end fs-6">
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
          <button type='submit' className='border-0 px-3 py-2 text-white fw-bold w-100' style={{ backgroundColor: "#ffd333" }}>Login</button>
          {/* <Link to='/admin' className='border-0 d-block text-center text-decoration-none px-3 py-2 text-white fw-bold w-100' style={{ backgroundColor: "#ffd333" }}>Login</Link> */}
        </form>
      </div>
    </div>
  )
}
