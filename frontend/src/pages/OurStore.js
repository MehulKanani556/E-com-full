import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta'
import ReactStars from "react-rating-stars-component";
import ProdCard from '../components/ProdCard'
import Color from '../components/Color';
import watch from '../images/watch.jpg'
import gr from '../images/gr.svg'
import gr2 from '../images/gr2.svg'
import gr3 from '../images/gr3.svg'
import gr4 from '../images/gr4.svg'
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';

export default function OurStore() {
  const [grid, setGrid] = useState(4);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  console.log(products)
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title={'Our Store'} />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Shop By Categories
              </h3>
              <div>
                <ul className='ps-0'>
                  <li>Watch</li>
                  <li>Tv</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Filter By
              </h3>
              <div className="">
                <h5 className="sub-title ">Availability</h5>
                <div>
                  <div className="form-check ">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" name id defaultValue="checkedValue" />
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" name id defaultValue="checkedValue" />
                      Out of Stock (0)
                    </label>

                  </div>
                </div>
                <h5 className="sub-title ">Price</h5>
                <div className='d-flex align-items-center gap-10'>
                  <div className="form-floating ">
                    <input type="email" className="form-control py-1" id="floatingInput" placeholder="From" />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating ">
                    <input type="email" className="form-control py-1" id="floatingInput1" placeholder="To" />
                    <label htmlFor="floatingInput1">To</label>
                  </div>

                </div>
                <h5 className="sub-title ">Colors</h5>
                <div className="">
                  <Color />
                </div>
                <h5 className="sub-title ">Size</h5>
                <div>
                  <div className="form-check ">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                      S (1)
                    </label>
                  </div>
                  <div className="form-check ">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                      M (1)
                    </label>
                  </div>
                  <div className="form-check ">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                      L (1)
                    </label>
                  </div>
                  <div className="form-check ">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" />
                      Xl (1)
                    </label>
                  </div>
                </div>

              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Product Tags
              </h3>
              <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                <span className="bg-light text-secondary badge rounded-3 py-2 px-3 ">Headphone </span>
                <span className="bg-light text-secondary badge rounded-3 py-2 px-3 ">Laptop </span>
                <span className="bg-light text-secondary badge rounded-3 py-2 px-3 ">Mobile </span>
                <span className="bg-light text-secondary badge rounded-3 py-2 px-3 ">Vivo </span>
                <span className="bg-light text-secondary badge rounded-3 py-2 px-3 ">Tablets </span>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">
                Random Product
              </h3>
              <div>
                <div className="random-product mb-3 d-flex">
                  <div className="w-50">
                    <img src={watch} className='img-fluid' alt="" />
                  </div>
                  <div className="w-50">
                    <h5 className="">Kids Headphones Bulk 10 Pack Multi Colored </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      value={3}
                      edit={false}
                    />
                    <b>
                      $100.00
                    </b>
                  </div>
                </div>
                <div className="random-product d-flex">
                  <div className="w-50">
                    <img src={watch} className='img-fluid' alt="" />
                  </div>
                  <div className="w-50">
                    <h5 className="">Kids Headphones Bulk 10 Pack Multi Colored </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      value={3}
                      edit={false}
                    />
                    <b>
                      $100.00
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block text-nowrap">Sort By :</p>
                  <select name="" defaultValue={"manual"} className='form-control form-select' id="">
                    <option value="manual">Featured</option>
                    <option value="best-selling">Best Selling</option>
                    <option value="title-ascending">Alphabetical A-Z</option>
                    <option value="title-descending">Alphabetical Z-A</option>
                    <option value="price-ascending">Price low to high</option>
                    <option value="price-descending">Price high to low</option>
                    <option value="date-ascending">Date old to new</option>
                    <option value="date-descending">Date new to new</option>

                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproduct mb-0">21 Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img onClick={() => setGrid(3)} src={gr4} alt="grid" className="d-block img-fluid" />
                    <img onClick={() => setGrid(4)} src={gr3} alt="grid" className="d-block img-fluid" />
                    <img onClick={() => setGrid(6)} src={gr2} alt="grid" className="d-block img-fluid" />
                    <img onClick={() => setGrid(12)} src={gr} alt="grid" className="d-block img-fluid" />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list row  pb-5">

              <ProdCard data={products} grid={grid} />
             
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
