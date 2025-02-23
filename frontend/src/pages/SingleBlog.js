import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import blog1 from '../images/blog-1.jpg'
import Container from '../components/Container'
export default function SingleBlog() {
    return (
        <>
            <Meta title="Dynamic Blog Name" />
            <BreadCrumb title={'Dynamic Blog Name'} />
            <Container class1="blog-wrapper home-wrapper-2 py-5 ">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blog" className='d-flex align-items-center gap-10 '><HiOutlineArrowLeft className='fs-4' /> Go back to blogd</Link>
                            <h3 className="title">
                                A Beautiful Sunday Morning Renaissance
                            </h3>
                            <img src={blog1} className='img-fluid my-4 w-100' alt="blog" />
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores debitis, ratione esse voluptatem illo recusandae aliquid veritatis neque impedit ullam eligendi eius ut, est, doloribus sint atque. Eligendi, quae dolorum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates est illo eos unde nihil, libero enim ipsum nemo. Necessitatibus itaque placeat voluptatum corrupti doloremque eos veritatis eaque blanditiis quisquam a.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
