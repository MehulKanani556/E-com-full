import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='py-5' style={{ backgroundColor: "#ffd333" ,minHeight:'100vh' }}>
      
      <div className='my-5 w-25 bg-white mx-auto rounded-3 p-4 '>
        <h3 className='text-center title'>Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="">
          <CustomInput type='text' label='Email' id='email' />
          <CustomInput type='password' label='Password' id='password' />
          <div className="mb-4 text-end fs-6">
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
          {/* <button type='submit' className='border-0 px-3 py-2 text-white fw-bold w-100' style={{ backgroundColor: "#ffd333" }}>Login</button> */}
          <Link to='/admin' className='border-0 d-block text-center text-decoration-none px-3 py-2 text-white fw-bold w-100' style={{ backgroundColor: "#ffd333" }}>Login</Link>
        </form>
      </div>
    </div>
  )
}
