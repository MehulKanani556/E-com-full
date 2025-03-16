import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquirys } from '../features/enquiry/enquirySlice';
import { Link } from 'lucide-react';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
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
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Mobile',
        dataIndex: 'mobile',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },

];


export default function Enquiries() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getEnquirys());
    }, []);
    const { enquirys, isLoading, isError, isSuccess, message } = useSelector((state) => state.enquiry);
    const dataSource = enquirys.map((ele, index) => ({
        key: index + 1,
        name: ele.name,
        email: ele.email,
        mobile: ele.mobile,
        comment: ele.comment,
        status: <>
            <select name="" id="" className='form-control form-select'>
                <option value="">Set Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
            </select>
        </>,
        action: <>
            <Link to={'/'} className='ms-3 fs-3 text-danger'><AiFillDelete /></Link>
        </>
    }));
    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
