import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getCoupons } from '../features/coupon/couponSlice';
// table
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),

    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        sorter: (a, b) => a.discount.localeCompare(b.discount),

    },
    {
        title: 'Expiry',
        dataIndex: 'expiry',
        sorter: (a, b) => a.expiry.localeCompare(b.expiry),

    },
    {
        title: 'Action',
        dataIndex: 'action',
    },

];


export default function Couponlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoupons());
    }, []);
    const { coupons, isLoading, isError, isSuccess, message } = useSelector((state) => state.coupon);
    const dataSource = coupons.map((coupon, index) => ({
        key: index + 1,
        name: coupon.name,
        discount: coupon.discount,
        expiry: new Date(coupon.expiry).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        action: <>
            <Link to={'/'} className='fs-3 text-danger'><BiEdit /></Link>
            <Link to={'/'} className='ms-3 fs-3 text-danger'><AiFillDelete /></Link>
        </>
    }));
    return (
        <div>
            <h3 className="mb-4 title">Coupon List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
