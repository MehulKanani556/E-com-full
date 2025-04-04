import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import { Link, useParams } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import blog1 from '../images/blog-1.jpg'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getBlog } from '../features/blogs/blogSlice'
export default function SingleBlog() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { blog } = useSelector(state => state.blog);
    useEffect(() => {
        dispatch(getBlog(id));
    })
    return (
        <>
            <Meta title={blog?.title} />
            <BreadCrumb title={blog?.title} />
            <Container class1="blog-wrapper home-wrapper-2 py-5 ">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blog" className='d-flex align-items-center gap-10 '><HiOutlineArrowLeft className='fs-4' /> Go back to blogs</Link>
                            <h3 className="title">
                                {blog?.title}
                            </h3>
                            <img src={blog?.images?.[0]?.url} className='object-fit-cover my-4 ' height={'400px'} alt="blog" />
                            <p dangerouslySetInnerHTML={{__html:blog?.description}}></p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
