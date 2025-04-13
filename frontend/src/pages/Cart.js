import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import watch from '../images/watch.jpg'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, removeProdCart, updateProdCart } from '../features/user/userSlice'

export default function Cart() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(null);
  const { cart } = useSelector((state) => state.auth);
  console.log(cart)
  useEffect(() => {
    dispatch(getCart());
  }, []);

  const calculateTotal = () => {
    let total = 0;
    if (cart) {
      cart.forEach(item => {
        total += item.price * item.quantity;
      });
    }
    return total;
  };

  const handleRemoveProdFromCart = (id) => {
    dispatch(removeProdCart(id));
    setTimeout(() => {
      dispatch(getCart());
    }, 300)
  }
  const handleUpdateProdFromCart = (id, newQuantity) => {
    dispatch(updateProdCart({ cartItemId: id, newQuantity }));
    setTimeout(() => {
      dispatch(getCart());
    }, 300)
  }
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
            {cart && cart.map((item, index) => {
              return (
                <div className="cart-data mb-2 py-3 d-flex justify-content-between align-items-center">
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className='w-25'>
                      <img src={item?.productId?.images?.[0]?.url} className='img-fluid' alt="product imag" />
                    </div>
                    <div className='w-75'>
                      <p>{item?.productId?.title}</p>
                      <p className='d-flex gap-3'>Color :
                        <ul className="colors ps-0">
                          <li style={{ backgroundColor: item?.color?.title }}></li>
                        </ul>
                      </p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">$ {item?.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div className="">
                      <input 
                        type="number" 
                        min={1} 
                        max={10} 
                        value={item?.quantity} 
                        onChange={(e) => handleUpdateProdFromCart(item._id, e.target.value)} 
                        className='form-control' 
                      />
                    </div>
                    <button className=" border-0" onClick={(e) => { handleRemoveProdFromCart(item._id) }}>
                      <AiFillDelete className='  text-danger' />
                    </button>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">$ {(item?.price) * (item?.quantity)}</h5>
                  </div>
                </div>
              )
            })}

            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link className='button' to='/product'>Continue To Shopping</Link>
                <div className='d-flex align-items-end flex-column'>
                  <h4>SubTotal : $ {calculateTotal()}</h4>
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
