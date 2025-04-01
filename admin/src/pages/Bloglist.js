import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
// table
const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Title',
        dataIndex: 'title',
    },
    {
        title: 'Category',
        dataIndex: 'category',
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },

];


export default function Bloglist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogs());
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
    const { blogs, isLoading, isError, isSuccess, message } = useSelector((state) => state.blog);
    const dataSource = blogs.map((ele, index) => ({
        key: index + 1,
        title: ele.title,
        category: ele.category,
        action: <>
            <Link to={`/admin/blog/${ele._id}`} className='fs-3 text-danger'><BiEdit /></Link>
            <button onClick={() => showModal(ele._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>
    }));
    const handleDelete = (id) => {
        dispatch(deleteBlog(id));
        setOpen(false);
    }
    return (
        <div>
            <h3 className="mb-4 title">Blogs List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
            <CustomModal performAction={() => { handleDelete(id) }} title={'Are you sure you want to delete this blog?'} open={open} hideModal={hideModal} />
            
        </div>
    )
}
