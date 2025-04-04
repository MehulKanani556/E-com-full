import React, { useEffect } from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import cross from '../images/cross.svg'
import watch from '../images/watch.jpg'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { getUserWishList } from '../features/user/userSlice'
import { addToWishList } from '../features/product/productSlice'

export default function Wishlist() {
    const dispatch = useDispatch();
    const { userWishList } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserWishList());
    }, [dispatch]);

    const removeWishList = (id) => {
        dispatch(addToWishList(id));
        setTimeout (()=>{
            dispatch(getUserWishList());
        },300)
    }
    return (
        <>
            <Meta title="Wishlist" />
            <BreadCrumb title={'Wishlist'} />
            <Container class1="wishlist-wrapper py-5 home-wrapper-2">
                <div className="row">
                    {userWishList && userWishList.wishlist?.length > 0 ? (
                        userWishList.wishlist.map((item, index) => (
                            <div className="col-3" key={index}>
                                <div className="wishlist-card position-relative">
                                    <img src={cross} alt="cross" className="position-absolute cross img-fluid" onClick={() => { removeWishList(item?._id) }} />
                                    <div className="wishlist-card-image bg-white">
                                        <img src={item?.images?.[0]?.url || watch} className='img-fluid w-100' alt="watch" />
                                    </div>
                                    <div className='p-3'>
                                        <h5 className="title">{item?.title}</h5>
                                        <h6 className="price my-3">$ {item?.price}</h6>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center fs-5">
                            <p>No products in your wishlist.</p>
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}
