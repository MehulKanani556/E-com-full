import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import CustomInput from '../components/CustomInput'

export default function Signup() {
  return (
    <>
      <Meta title="Sign Up" />
      <BreadCrumb title={'Sign Up'} />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row gx-0">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="title text-center mb-3">Sign Up</h3>
              <form action="" className='d-flex flex-column gap-15'>
                <CustomInput type="text" name='name' placeholder='Name' />
                <CustomInput type="email" name='email' placeholder='Email' />
                <CustomInput type="tel" name='mobile' placeholder='Mobile Number' />
                <CustomInput type="password" name='password' placeholder='Password' />
               
               
                
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
