import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnquiry, getEnquirys, updateEnquiry } from '../features/enquiry/enquirySlice';
import { Link } from 'lucide-react';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
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
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getEnquirys());
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
    const { enquirys, isLoading, isError, isSuccess, message } = useSelector((state) => state.enquiry);
    const dataSource = enquirys.map((ele, index) => ({
        key: index + 1,
        name: ele.name,
        email: ele.email,
        mobile: ele.mobile,
        comment: ele.comment,
        status: <>
            <select name="" id="" value={ele?.status || ""} className='form-control form-select'
                onChange={(e) => {
                    const data = {
                        id: ele?._id,
                        status: e.target.value
                    };
                    dispatch(updateEnquiry(data));
                }}
            >
                <option value="">Set Status</option>
                <option value="Submitted">Submitted</option>

                <option value="Contacted">Contacted</option>
                <option value="In Process">In Process</option>
                <option value="Resolved">Resolved</option>
            </select>
        </>,
        action: <>
            <button onClick={() => { navigate(`/admin/enquiries/${ele._id}`) }} className='fs-3 text-danger  bg-transparent border-0'><AiOutlineEye /></button>
            <button onClick={() => showModal(ele._id)} className='ms-3 fs-3 text-danger  bg-transparent border-0'><AiFillDelete /></button>
        </>
    }));
    const handleDelete = (id) => {
        dispatch(deleteEnquiry(id));
        setOpen(false);
    }
    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
            <CustomModal performAction={() => { handleDelete(id) }} title={'Are you sure you want to delete this enquiry?'} open={open} hideModal={hideModal} />

        </div>
    )
}
