import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteCoupon, getCoupons } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';
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
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const showModal = (id) => {
        setOpen(true);
        setId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const { coupons, isLoading, isError, isSuccess, message } = useSelector((state) => state.coupon);
    const dataSource = coupons.map((coupon, index) => ({
        key: index + 1,
        name: coupon.name,
        discount: coupon.discount,
        expiry: new Date(coupon.expiry).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        action: <>
        <Link to={`/admin/coupon/${coupon._id}`} className='fs-3 text-danger'><BiEdit /></Link>
        <button onClick={() => showModal(coupon._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
    </>
    }));
    const handleDelete = (id) => {
        dispatch(deleteCoupon(id));
        setOpen(false);
    }
    return (
        <div>
            <h3 className="mb-4 title">Coupon List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
            <CustomModal performAction={() => { handleDelete(id) }} title={'Are you sure you want to delete this coupon?'} open={open} hideModal={hideModal} />

        </div>
    )
}
