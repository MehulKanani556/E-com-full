import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai'
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi'
import Container from '../components/Container'

export default function Contact() {
  return (
    <>
      <Meta title="Contact" />
      <BreadCrumb title={'Contact'} />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3718.7781696950055!2d72.8863516750118!3d21.24064336945375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1736351826593!5m2!1sen!2sin" width={600} height={450} className='w-100' style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between align-items-center">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" className='d-flex flex-column gap-15'>
                  <div>
                    <input type="text" className="form-control" placeholder="Name" />
                  </div>
                  <div>
                    <input type="text" className="form-control" placeholder="Email" />
                  </div>
                  <div>
                    <input type="text" className="form-control" placeholder="Mobile nO" />
                  </div>
                  <div>
                    <textarea name="" id="" className="form-control w-100" placeholder="Comments" cols="30" rows="4"></textarea>
                  </div>
                  <div><button className='button border-0'>Submit</button></div>
                </form>

              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div className="">
                  <ul className="ps-0">
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineHome className='fs-5' />
                      <address className='mb-0'>Hno : A-203 ,Near lajamani ,Mota varachha ,surat</address>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiPhoneCall className='fs-5' />
                      <a href="tel: +91 9876543210" className='text-decoration-none'>+91 9876543210</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <AiOutlineMail className='fs-5' />
                      <a href="mailto:abc@gmail.com">abc@gmail.com</a>
                    </li>
                    <li className='mb-3 d-flex gap-15 align-items-center'>
                      <BiInfoCircle className='fs-5' />
                      <p className="mb-0">Monday - Friday 10 AM - 8 PM </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
