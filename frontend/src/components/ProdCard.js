import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import wishlist from '../images/wishlist.svg';
import watch from '../images/watch.jpg';
import watch2 from '../images/tab1.jpg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import {useDispatch} from 'react-redux';
import { addToWishList } from '../features/product/productSlice';
export default function ProdCard(props) {
    const { grid, data } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(data)
    let location = useLocation();
    const addToWish = (id) =>{
        dispatch(addToWishList(id));
    }
    return (
        <>
            {data&&data.map((item, index) => {
                return (
                    <div key={index} className={` ${location.pathname == '/product' ? `col-${grid}` : 'col-3'}`}>
                        <div className="product-card w-100 position-relative my-2">
                            <div className="wishlist-icon position-absolute">
                                <button className='border-0 bg-transparent' onClick={(e)=>addToWish(item._id)}>
                                    <img src={wish} alt="wish list" />
                                </button>
                            </div>
                            <div className="product-image">
                                <img src={item?.images[0]?.url} className='img-fluid' alt="product images" />
                                <img src={item?.images[1]?.url}className='img-fluid' alt="product images" />
                            </div>
                            <div className="product-details">
                                <h6 className='brands'>{item?.brand}</h6>
                                <h5 className="product-title">
                                   {item?.title.substr(0,60)+'...'}
                                </h5>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={item?.totalRating}
                                    edit={false}
                                />
                                <p 
                                
                                className={`description ${grid == 12 ? 'd-block' : 'd-none'}`}
                                dangerouslySetInnerHTML={{__html:item?.description}}
                                ></p>
                                <p className="price">
                                   $ {item?.price}
                                </p>
                            </div>
                            <div className="action-bar position-absolute">
                                <div className='d-flex flex-column gap-15'>
                                    <button className='border-0 bg-transparent'><img src={prodcompare} alt="prodcompare" /></button>
                                    <button className='border-0 bg-transparent'><img onClick={()=>{navigate(`/product/${item?._id}`)}} src={view} alt="view" /></button>
                                    <button className='border-0 bg-transparent'><img src={addcart} alt="add cart" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>

    )
}
