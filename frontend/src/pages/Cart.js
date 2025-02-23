import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import watch from '../images/watch.jpg'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Container from '../components/Container'

export default function Cart() {
  return (
    <>
      <Meta title="Cart" />
      <BreadCrumb title={' Cart'} />
      <Container class1="cart-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className='cart-col-1'>Product</h4>
              <h4 className='cart-col-2'>Price</h4>
              <h4 className='cart-col-3'>Quantity</h4>
              <h4 className='cart-col-4'>Total</h4>
            </div>
            <div className="cart-data mb-2 py-3 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <div className='w-25'>
                  <img src={watch} className='img-fluid' alt="product imag" />
                </div>
                <div className='w-75'>
                  <p>dsfsddfSD</p>
                  <p>Size :</p>
                  <p>Color :</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">$ 100</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div className=""><input type="number" min={1} max={10} className='form-control' name="" id="" /></div>
                <div className="">
                  <AiFillDelete className='  text-danger' />
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">$ 100</h5>
              </div>
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">

                <Link className='button' to='/product'>Continue To Shopping</Link>
                <div className='d-flex align-items-end flex-column'>
                  <h4>SubTotal : $ 1000</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link className='button' to='/checkout'>Checkout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
