import React from 'react'
import CustomInput from '../components/CustomInput'

export default function Forgotpassword() {
  return (
    <div className='py-5' style={{ backgroundColor: "#ffd333" ,minHeight:'100vh' }}>
      
      <div className='my-5 w-25 bg-white mx-auto rounded-3 p-4 '>
        <h3 className='text-center title'>Forgot Password</h3>
        <p className="text-center">Please enter your register email to get reset password mail.</p>
        <form action="">
          <CustomInput type='text' label='Email' id='email' />
          
          <button type='submit' className='border-0 px-3 py-2 text-white fw-bold w-100' style={{ backgroundColor: "#ffd333" }}>Send Link </button>
        </form>
      </div>
    </div>
  )
}
