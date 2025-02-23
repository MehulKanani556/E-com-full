import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

export default function Resetpassword() {
  return (
    <>
      <Meta title="Reset Password" />
      <BreadCrumb title={'Reset Password'} />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row gx-0">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Reset Password</h3>
              <form action="" className='d-flex flex-column gap-15'>
                <CustomInput type="password" name='Password' placeholder='Password' />
                <CustomInput type="password" name='confpassword' placeholder='Confirm Password' /> 
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center ">
                  <button className="button border-0" type="submit">Ok</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
