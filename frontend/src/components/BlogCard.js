import React from 'react'
import { Link } from 'react-router-dom'
import blog1 from '../images/blog-1.jpg'

export default function BlogCard({ blog }) {
    return (

        <div className='blog-card'>
            <div className="card-image">
                <img src={blog?.images[0]?.url} className='img-fluid w-100' alt="" />
            </div>
            <div className="blog-content">
                <p className="date">{new Date(blog?.createdAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
                <h5 className="title"> {blog?.title}</h5>
                <p className="desc" dangerouslySetInnerHTML={{ __html: blog?.description?.substring(0, 70) + '...' }}></p>
                <Link to={`/blog/${blog._id}`} className='button'>Read more</Link>
            </div>
        </div>
    )
}
