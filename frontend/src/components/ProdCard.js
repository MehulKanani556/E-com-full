import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from 'react-router-dom';
import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import wishlist from '../images/wishlist.svg';
import watch from '../images/watch.jpg';
import watch2 from '../images/tab1.jpg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';

export default function ProdCard(props) {
    const { grid } = props;
    // alert(grid)
    let location = useLocation();
    return (
        <div className={` ${location.pathname == '/product' ? `col-${grid}` : 'col-3'}`}>
            <Link to={'/product/:id'} className="product-card position-relative my-2">
                <div className="wishlist-icon position-absolute">
                    <button className='border-0 bg-transparent'>
                        <img src={wish} alt="wish list" />
                    </button>
                </div>
                <div className="product-image">
                    <img src={watch} className='img-fluid' alt="product images" />
                    <img src={watch2} className='img-fluid' alt="product images" />
                </div>
                <div className="product-details">
                    <h6 className='brands'>Havels</h6>
                    <h5 className="product-title">
                        Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={3}
                        edit={false}
                    />
                    <p className={`description ${grid == 12 ? 'd-block' : 'd-none'}`}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas eius ipsum necessitatibus molestias commodi ratione quaerat itaque fuga omnis, natus in doloribus praesentium fugit doloremque nemo pariatur, incidunt, quidem neque!</p>
                    <p className="price">
                        $100.00
                    </p>
                </div>
                <div className="action-bar position-absolute">
                    <div className='d-flex flex-column gap-15'>
                        <button className='border-0 bg-transparent'><img src={prodcompare} alt="prodcompare" /></button>
                        <button className='border-0 bg-transparent'><img src={view} alt="view" /></button>
                        <button className='border-0 bg-transparent'><img src={addcart} alt="add cart" /></button>
                    </div>
                </div>
            </Link>
        </div>
    )
}
