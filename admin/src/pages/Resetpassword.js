import React from 'react'
import CustomInput from '../components/CustomInput'

export default function Resetpassword() {
  return (
    <div className='py-5' style={{ backgroundColor: "#ffd333" ,minHeight:'100vh' }}>
      
      <div className='my-5 w-25 bg-white mx-auto rounded-3 p-4 '>
        <h3 className='text-center title'>
          Reset Password
        </h3>
        <p className="text-center">Please enter your new password.</p>
        <form action="">
          <CustomInput type='password' label='Password' id='password' />
          <CustomInput type='password' label='Confirm Password' id='confirmpass' />
          <button type='submit' className='border-0 px-3 py-2 text-white fw-bold w-100' style={{ backgroundColor: "#ffd333" }}>Rest Password</button>
        </form>
      </div>
    </div>
  )
}
