import React, { useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import ProdCard from '../components/ProdCard'
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from 'react-image-zoom';
import Color from '../components/Color'
import { Link } from 'react-router-dom';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import watch from '../images/watch.jpg'
import Container from '../components/Container';
// import watch from '../../public/images/watch.jpg'
export default function SingleProduct() {
    const props = { zoomWidth: 600, img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg" };
    const [orderedProduct, setOrderedProduct] = useState(false);
    const copyToClipboard = (text) => {
        console.log('text', text)
        var textField = document.createElement('textarea')
        textField.innerText = text
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
    }
    return (
        <>
            <Meta title="Product Name" />
            <BreadCrumb title={'Product Name'} />
            <Container class1='main-product-wrapper py-5 home-wrapper-2'>
                <div className="row">
                    <div className="col-6">
                        <div className="main-product-image">
                            <div className="">
                                <ReactImageZoom {...props} />
                            </div>
                        </div>
                        <div className="other-product-image d-flex flex-wrap gap-15">
                            <div><img src={watch} className='img-fluid' alt="watch" /></div>
                            <div><img src={watch} className='img-fluid' alt="watch" /></div>
                            <div><img src={watch} className='img-fluid' alt="watch" /></div>
                            <div><img src={watch} className='img-fluid' alt="watch" /></div>

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-product-details">
                            <div className="border-bottom">
                                <h3 className='title'>Kids Headphones Bulk 10 Pack Multi Colored For Students</h3>
                            </div>
                            <div className="border-bottom py-3">
                                <p className="price ">$100.00</p>
                                <div className="d-flex align-items-center gap-10">
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={3}
                                        edit={false}
                                    />
                                    <p className='mb-0 t-review'>( 2 Reviews)</p>
                                </div>
                                <a className='review-btn' href="#review">Write a Review</a>
                            </div>
                            <div className=" py-3">
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='product-heading'> Type :</h3> <p className='product-data'>Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='product-heading'> Brand :</h3> <p className='product-data'>Havells</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='product-heading'> Category :</h3> <p className='product-data'>Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='product-heading'> Tags :</h3> <p className='product-data'>Watch</p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='product-heading'> Availablity :</h3> <p className='product-data'>In Stock</p>
                                </div>
                                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                    <h3 className='product-heading'> Size :</h3>
                                    <div className="d-flex flex-wrap gap-15">
                                        <span className="badge border-1 bg-white text-dark border-secondary border">S</span>
                                        <span className="badge border-1 bg-white text-dark border-secondary border">M</span>
                                        <span className="badge border-1 bg-white text-dark border-secondary border">L</span>
                                        <span className="badge border-1 bg-white text-dark border-secondary border">XL</span>

                                    </div>
                                </div>
                                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                                    <h3 className='product-heading'> Color :</h3>
                                    <Color />
                                </div>
                                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                                    <h3 className='product-heading'> Quantity :</h3>
                                    <div className="">
                                        <input type="number" name='' min={1} max={10} style={{ width: '70px' }} className='form-control' />
                                    </div>
                                    <div className="d-flex  gap-30 align-items-center ms-5">
                                        <button type="submit" className="button border-0">Add TO Cart</button>
                                        <button className='button signup'>Buy It Now</button>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <div className=""><a href=""><TbGitCompare className='fs-5 me-2' /> Add to Compare</a></div>
                                    <div className=""><a href=""><AiOutlineHeart className='fs-5 me-2' /> Add to Wishlist</a></div>
                                </div>
                                <div className="d-flex gap-10 flex-column  my-3">
                                    <h3 className='product-heading'> Shipping & Returns :</h3>
                                    <p className='product-data'>Free shipping and returns available on all orders! <br /> We ship all US domestic order within <b>5-10 business days!</b> </p>
                                </div>
                                <div className="d-flex gap-10 align-items-center my-2">
                                    <h3 className='product-heading'> Copy Product Link :</h3>
                                    <a href="javascript:void(0);" onClick={(e) => { copyToClipboard("https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg") }}>Copy Product Link</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="description-wrapper home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h4 className="">Description</h4>
                        <div className="bg-white p-3">
                            <p className="">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas cupiditate, voluptatum dolor officiis ipsam modi ea minus. Obcaecati recusandae eius neque saepe laborum eaque ipsam minus accusantium nulla culpa!
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
            <Container class1="reviews-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 id='review' className="">Reviews</h3>
                        <div className="review-inner-wrapper">
                            <div className="review-head d-flex justify-content-between align-items-center">
                                <div className="">
                                    <h4 className="mb-2">Customer Reviews</h4>
                                    <div className="d-flex gap-10 align-items-center">
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={3}
                                            edit={false}
                                        />
                                        <p className='mb-0'>Based on 2 Reviews</p>
                                    </div>
                                </div>
                                {orderedProduct &&
                                    <div className="">
                                        <a href="" className='text-dark text-decoration-underline'>Write a Review</a>
                                    </div>
                                }
                            </div>
                            <div className="review-form py-4">
                                <h4>Write a Review</h4>
                                <form action="" className='d-flex flex-column gap-15'>
                                    <div>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={3}
                                            edit={true}
                                        />
                                    </div>
                                    <div>
                                        <textarea name="" id="" className="form-control w-100" placeholder="Comments" cols="30" rows="4"></textarea>
                                    </div>
                                    <div className='d-flex justify-content-end'><button className='button border-0'>Submit Review</button></div>
                                </form>
                            </div>
                            <div className="reviews mt-4">
                                <div className="review">
                                    <div className="d-flex gap-10 align-items-center">
                                        <h6 className='mb-0'>Mehul</h6>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            activeColor="#ffd700"
                                            value={3}
                                            edit={false}
                                        />
                                    </div>
                                    <p className='mt-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque ullam illum, fuga vitae quis voluptatibus sed. Soluta odit beatae, tempora repellendus ab inventore deserunt sequi, nesciunt accusantium, delectus quo aspernatur!</p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Container>
            <Container class1="popular-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Popular Products</h3>
                    </div>
                </div>
                <div className="row">
                    <ProdCard />
                    <ProdCard />
                    <ProdCard />
                    <ProdCard />
                </div>
            </Container>
        </>
    )
}
