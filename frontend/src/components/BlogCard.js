import React from 'react'
import { Link } from 'react-router-dom'
import blog1 from '../images/blog-1.jpg'

export default function BlogCard() {
    return (

        <div className='blog-card'>
            <div className="card-image">
                <img src={blog1} className='img-fluid w-100' alt="" />
            </div>
            <div className="blog-content">
                <p className="date">11 June, 2024</p>
                <h5 className="title"> A Beautiful sunday morning renaissance </h5>
                <p className="desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, pariatur aperiam.
                </p>
                <Link to={'/blog/:id'} className='button'>Read more</Link>
            </div>
        </div>
    )
}
