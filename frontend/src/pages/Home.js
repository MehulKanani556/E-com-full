import React, { useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import { Link, useLocation } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import ProdCard from '../components/ProdCard'
import SpecialProduct from '../components/SpecialProduct'
import Container from '../components/Container'
import { services } from '../utils/Data'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../features/blogs/blogSlice'
import { addToWishList, getProducts } from '../features/product/productSlice'
import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import ReactStars from "react-rating-stars-component";
export default function Home() {
  let location = useLocation();
  const dispatch = useDispatch();
  const { blogs } = useSelector(state => state.blog);
  const { products } = useSelector(state => state.product);
  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getProducts());
  }, []);
  const addToWish = (id) => {
    dispatch(addToWishList(id));
  }
  return (
    <>
      <Container class1='home-wrapper-1 py-5'>
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img src="images/main-banner-1.jpg" className='img-fluid rounded-3' alt="main banner" />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROPS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo. </p>
                <Link className='button'>Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img src="images/catbanner-01.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>BEST SALE</h4>
                  <h5>Laptop Max</h5>
                  <p>From $1699.00 <br /> or $64.62/mo. </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-03.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>Buy IPad Air</h5>
                  <p>From $599 <br /> or $49.91/mo. </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-02.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>15% OFF</h4>
                  <h5>Smartwatch 7</h5>
                  <p>Shop the latest band <br />styles and colors.</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-04.jpg" className='img-fluid rounded-3' alt="main banner" />
                <div className="small-banner-content position-absolute">
                  <h4>FREE ENGRAVING</h4>
                  <h5>AirPods Max</h5>
                  <p>High-fidelity playback & <br />ultra-low distortion</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">

              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="servies" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className='mb-0'>{i.tagline}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-3 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Smart Tv
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Smart Watches
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Music & Gaming
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Cameras
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Smart Tv
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Smart Watches
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex align-items-center ">
                <div className="">
                  <h6>
                    Music & Gaming
                  </h6>
                  <p>
                    10 Items
                  </p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="featured-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          {products && products.map((item, index) => {
            if (item.tags === "featured") {
              return (
                <div key={index} className='col-3'>
                  <Link to={'/product/:id'} className="product-card w-100 position-relative my-2">
                    <div className="wishlist-icon position-absolute">
                      <button className='border-0 bg-transparent' onClick={(e) => addToWish(item._id)}>
                        <img src={wish} alt="wish list" />
                      </button>
                    </div>
                    <div className="product-image ">
                      <img src={item?.images[0]?.url} className='img-fluid' alt="product images" />
                      <img src={item?.images[1]?.url} className='img-fluid' alt="product images" />
                    </div>
                    <div className="product-details">
                      <h6 className='brands'>{item?.brand}</h6>
                      <h5 className="product-title">
                        {item?.title.substr(0, 60) + '...'}
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={item?.totalRating}
                        edit={false}
                      />
                      <p

                        className={`description d-none`}
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></p>
                      <p className="price">
                        $ {item?.price}
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
          })}
        </div>
      </Container>
      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-1.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute ">

                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399 or $16.62/mo. for 24mo*.</p>
              </div>

            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-2.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute ">
                <h5 className='text-dark'>Studio Display</h5>
                <h6 className='text-dark'>600 nits of brightness</h6>
                <p className='text-dark'>27-inch 5K Retina display</p>
              </div>

            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-3.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute ">
                <h5 className='text-dark'>Smart Phone</h5>
                <h6 className='text-dark'>Smart Phone 13 Pro</h6>
                <p className='text-dark'>Now in Green From $999.00 or $41.62/mo. for 24mo* .</p>
              </div>

            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img src="images/famous-4.webp" className='img-fluid' alt="famous" />
              <div className="famous-content position-absolute ">

                <h5 className='text-dark'>Home Speakers</h5>
                <h6 className='text-dark'>Room-filling sound</h6>
                <p className='text-dark'>From $699 or $116.58/mo. for 12mo*.</p>
              </div>

            </div>
          </div>
        </div>
      </Container>
      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
          <div className="row">
            {products && products.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProduct
                    key={index}
                    title={item?.title}
                    brand={item?.brand}
                    price={item?.price}
                    rating={item?.totalRating}
                    sold={item?.sold}
                    qty={item?.quantity}
                    image={item?.images?.[0]?.url}
                  />
                )
              }
            })}
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
          {products && products.map((item, index) => {
            if (item.tags === "popular") {
              return (
                <div key={index} className='col-3'>
                  <Link to={'/product/:id'} className="product-card w-100 position-relative my-2">
                    <div className="wishlist-icon position-absolute">
                      <button className='border-0 bg-transparent' onClick={(e) => addToWish(item._id)}>
                        <img src={wish} alt="wish list" />
                      </button>
                    </div>
                    <div className="product-image">
                      <img src={item?.images[0]?.url} className='img-fluid' alt="product images" />
                      <img src={item?.images[1]?.url} className='img-fluid' alt="product images" />
                    </div>
                    <div className="product-details">
                      <h6 className='brands'>{item?.brand}</h6>
                      <h5 className="product-title">
                        {item?.title.substr(0, 60) + '...'}
                      </h5>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={item?.totalRating}
                        edit={false}
                      />
                      <p

                        className={`description d-none`}
                        dangerouslySetInnerHTML={{ __html: item?.description }}
                      ></p>
                      <p className="price">
                        $ {item?.price}
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
          })}
          {/* <ProdCard data={products} /> */}

          {/* <ProdCard />
          <ProdCard />
          <ProdCard />
          <ProdCard /> */}
        </div>
      </Container>
      <Container class1="marque-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marque-inner-wrapper card-wrapper ">
              <Marquee className='d-flex'>
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brands" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brands" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brands" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brands" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brands" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brands" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brands" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brands" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest News</h3>
          </div>
        </div>
        <div className="row">
          {blogs.slice(0, 4).map(blog => (
            <div key={blog.id} className="col-3  overflow-hidden"><BlogCard blog={blog} /></div>
          ))}
        </div>
      </Container>
    </>
  )
}
