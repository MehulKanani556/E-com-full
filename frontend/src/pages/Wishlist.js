import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import cross from '../images/cross.svg'
import watch from '../images/watch.jpg'
import Container from '../components/Container'

export default function Wishlist() {
    return (
        <>
            <Meta title="Wishlist" />
            <BreadCrumb title={'Wishlist'} />
            <Container class1="wishlist-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className="wishlist-card position-relative">
                            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="wishlist-card-image">
                                <img src={watch} className='img-fluid w-100' alt="watch" />
                            </div>
                            <div className='p-3'>

                                <h5 className="title">Honor T17.0 1GB RAM 8GB ROM 7 inch With wi-fi+3G Tablet</h5>
                                <h6 className="price my-3">$100.00</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="wishlist-card position-relative">
                            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="wishlist-card-image">
                                <img src={watch} className='img-fluid w-100' alt="watch" />
                            </div>
                            <div className='p-3'>

                                <h5 className="title">Honor T17.0 1GB RAM 8GB ROM 7 inch With wi-fi+3G Tablet</h5>
                                <h6 className="price my-3">$100.00</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="wishlist-card position-relative">
                            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="wishlist-card-image">
                                <img src={watch} className='img-fluid w-100' alt="watch" />
                            </div>
                            <div className='p-3'>

                                <h5 className="title">Honor T17.0 1GB RAM 8GB ROM 7 inch With wi-fi+3G Tablet</h5>
                                <h6 className="price my-3">$100.00</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
