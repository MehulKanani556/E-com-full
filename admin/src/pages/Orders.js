import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'lucide-react';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { getOrders } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
// table
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    // {
    //     title: 'Action',
    //     dataIndex: 'action',
    // },

];


export default function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    const { orders, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    console.log(orders)
    const dataSource = orders.map((ele, index) => ({
        key: index + 1,
        name: ele.orderby.firstname+" "+ele.orderby.lastname,
        product:   <button onClick={() => { navigate(`/admin/order/${ele._id}`) }} className=' bg-transparent border-0'>View</button>,
        amount: ele.paymentIntent.amount,
        date: new Date(ele.createdAt).toLocaleDateString('en-US'),
        // action: <>
       
        //     <Link to={'/'} className='fs-3 text-danger'><BiEdit /></Link>
        //     <Link to={'/'} className='ms-3 fs-3 text-danger'><AiFillDelete /></Link>
        // </>
    }));
    return (
        <div>
            <h3 className="mb-4 title">Orders</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
