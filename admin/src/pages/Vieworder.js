import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'lucide-react';
import { BiArrowBack, BiEdit } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { getOrderByUserId, getOrders } from '../features/auth/authSlice';
import { useNavigate, useParams } from 'react-router-dom';
// table
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Product Name',
        dataIndex: 'name',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
    },
    {
        title: 'Count',
        dataIndex: 'count',
    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },


];


export default function Vieworder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getOrderByUserId(id))

    }, []);
    const { order, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
    console.log(order)
    const dataSource = order && order.map((ele, index) => ({
        key: index + 1,
        name: ele.product.title,
        // product: ele.products.map(product => product.product.title).join(', '),
        count: ele.count,
        color: ele.color,
        brand: ele.product.brand,
        amount: ele.product.price,
        date: new Date(ele.product.createdAt).toLocaleDateString('en-US'),

    }));
    const goBack = () => {        
        navigate(-1);
    }
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">

                <h3 className="mb-4 title">View Order</h3>
                <button className='bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1' onClick={goBack}><BiArrowBack className='fs-5' /> Go Back</button>
            </div>
            <h3 className="mb-4 title"></h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
