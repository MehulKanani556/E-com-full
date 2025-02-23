import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Color from '../components/Color'
import cross from '../images/cross.svg'
import watch from '../images/watch.jpg'
import Container from '../components/Container'



export default function CompareProduct() {
    return (
        <>
            <Meta title="Compare Products" />
            <BreadCrumb title={'Compare Products'} />
            <Container class1="compare-product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src={watch} alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">Honor T17.0 1GB RAM 8GB ROM 7 inch With wi-fi+3G Tablet</h5>
                                <h6 className="price my-3">$100.00</h6>
                                <div className=''>
                                    <div className="product-detail">
                                        <h5>Brand :</h5>
                                        <p>Hawels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type :</h5>
                                        <p>Tablet Computers</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>SKU :</h5>
                                        <p>SKU033</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Avaibility :</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color :</h5>
                                        <Color />
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size :</h5>
                                        <div className="d-flex gap-10">
                                            <p>S</p>
                                            <p>M</p>
                                            <p>L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="compare-product-card position-relative">
                            <img src={cross} alt="cross" className="position-absolute cross img-fluid" />
                            <div className="product-card-image">
                                <img src={watch} alt="watch" />
                            </div>
                            <div className="compare-product-details">
                                <h5 className="title">Honor T17.0 1GB RAM 8GB ROM 7 inch With wi-fi+3G Tablet</h5>
                                <h6 className="price my-3">$100.00</h6>
                                <div className=''>
                                    <div className="product-detail">
                                        <h5>Brand :</h5>
                                        <p>Hawels</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Type :</h5>
                                        <p>Tablet Computers</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>SKU :</h5>
                                        <p>SKU033</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Avaibility :</h5>
                                        <p>In Stock</p>
                                    </div>
                                    <div className="product-detail">
                                        <h5>Color :</h5>
                                        <Color />
                                    </div>
                                    <div className="product-detail">
                                        <h5>Size :</h5>
                                        <div className="d-flex gap-10">
                                            <p>S</p>
                                            <p>M</p>
                                            <p>L</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </>
    )
}
