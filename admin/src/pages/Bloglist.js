import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
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
    const { blogs, isLoading, isError, isSuccess, message } = useSelector((state) => state.blog);
    const dataSource = blogs.map((ele, index) => ({
        key: index + 1,
        title: ele.title,
        category: ele.category,
        action: <>
            <Link to={'/'} className='fs-3 text-danger'><BiEdit /></Link>
            <Link to={'/'} className='ms-3 fs-3 text-danger'><AiFillDelete /></Link>
        </>
    }));
    return (
        <div>
            <h3 className="mb-4 title">Blogs List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
