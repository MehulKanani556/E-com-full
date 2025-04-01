import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogCategory, getCategories } from '../features/bcategory/bcategorySlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
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
        title: 'Action',
        dataIndex: 'action',
    },

];

export default function Blogcatlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
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
    const { bCategories, isLoading, isError, isSuccess, message } = useSelector((state) => state.bcategory);
    const dataSource = bCategories.map((ele, index) => ({
        key: index + 1,
        name: ele.title,
        action: <>
            <Link to={`/admin/blog-category/${ele._id}`} className='fs-3 text-danger'><BiEdit /></Link>
            <button onClick={() => showModal(ele._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>
    }));
    const handleDelete = (id) => {
        dispatch(deleteBlogCategory(id));
        setOpen(false);
    }
    return (
        <div>
            <h3 className="mb-4 title">Blog Categories</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
            <CustomModal performAction={() => { handleDelete(id) }} title={'Are you sure you want to delete this blog category?'} open={open} hideModal={hideModal} />

        </div>
    )
}
