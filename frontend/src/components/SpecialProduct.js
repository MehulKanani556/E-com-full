import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import watch from '../images/watch.jpg'
export default function SpecialProduct({ title, brand, rating, price, sold, qty,image,id }) {
    console.log(qty / qty + sold * 100)
    return (
        <div className='col-6'>
            <div className="special-product-card">
                <div className="d-flex justify-content-between">
                    <div className="">
                        <img src={image} className='img-fluid' alt="watch" />
                    </div>
                    <div className="special-product-content">
                        <h5 className="brands">{brand}</h5>
                        <h6 className="title">{title}</h6>
                        <ReactStars
                            count={5}
                            size={24}
                            activeColor="#ffd700"
                            value={rating}
                            edit={false}
                        />
                        <p className="price">
                            <span className="red-p">$ {price}</span>
                            {/* &nbsp; <strike>$200</strike> */}
                        </p>
                        <div className="discount-till d-flex align-items-center gap-10">
                            <p className='mb-0'>
                                <b>5</b>days
                            </p>
                            <div className='d-flex gap-10  align-items-center '>
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>:
                                <span className='badge rounded-circle p-3 bg-danger'>1</span>
                            </div>
                        </div>
                        <div className="prod-count my-3">
                            <p>Product: {qty}</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${(sold / (sold + qty)) * 100}%` }}
                                    aria-valuenow={(sold / (sold + qty)) * 100}
                                    aria-valuemin={0}
                                    aria-valuemax={100} />
                            </div>
                        </div>
                        <Link className='button' to={`/product/${id}`}>View</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
