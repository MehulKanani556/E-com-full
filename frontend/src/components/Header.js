import React, { useEffect } from 'react'
import { BsSearch } from 'react-icons/bs';
import { NavLink, Link } from 'react-router-dom';
import compare from '../images/compare.svg';
import wishlist from '../images/wishlist.svg';
import userimg from '../images/user.svg';
import cartimg from '../images/cart.svg';
import menu from '../images/menu.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../features/user/userSlice';
const Header = () => {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state.auth);
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

  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className='text-white mb-0'>
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className='text-end text-white mb-0'>
                Hotline: <a className='text-white' href="tel:+91 6352800647">+91 6352800647</a>
              </p>
            </div>
          </div>

        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">

            <div className="col-2">
              <h2>
                <Link className='text-white'>
                  Devcorner
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <input type="text" className="form-control py-2" placeholder="Search Product Here..." aria-label="Search Product Here..." aria-describedby="basic-addon2" />
                <span className="input-group-text p-3" id="basic-addon2"><BsSearch className='fs-6' /></span>
              </div>

            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link to="/compare-product" className='d-flex align-items-center gap-10 text-white' >
                    <img src={compare} alt="Compare" />
                    <p className='mb-0'>Compare <br /> Products</p>
                  </Link>
                </div>
                <div>
                  <Link to="/wishlist" className='d-flex align-items-center gap-10 text-white' >
                    <img src={wishlist} alt="wishlist" />
                    <p className='mb-0'>Favourite <br />Wishlist</p>
                  </Link>
                </div>
                <div>
                  <Link to={user == null ?"/login":""} className='d-flex align-items-center gap-10 text-white' >
                    <img src={userimg} alt="user" />
                    {console.log(user)}
                    {user == null ?
                      <p className='mb-0'>Login <br /> My Account</p>
                      :
                      <p className='mb-0'>Welcome <br />{user?.firstname}</p>
                    }
                  </Link>
                </div>
                <div>
                  <Link to="/cart" className='d-flex align-items-center gap-10 text-white' >
                    <img src={cartimg} alt="cart" />
                    <div className='d-flex flex-column gap-10'>
                      <span className="badge bg-white text-dark">
                        {cart.length || 0}
                      </span>
                      <p className='mb-0'>$ {calculateTotal()}</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="">

                  <div className="dropdown">
                    <button className="btn btn-secondary gap-15  d-flex align-items-center dropdown-toggle bg-transparent border-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={menu} alt="" />
                      <span className='me-5 d-inline-block'>
                        Shop Categories
                      </span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item text-white" to="">Action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Another action</Link></li>
                      <li><Link className="dropdown-item text-white" to="">Something else here</Link></li>
                    </ul>
                  </div>

                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/product'}>Our Store</NavLink>
                    <NavLink to={'/blog'}>Blogs</NavLink>
                    <NavLink to={'/contact'}>Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
