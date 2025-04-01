import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors } from '../features/color/colorSlice';
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
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),

    },
    {
        title: 'Action',
        dataIndex: 'action',
    },

];


export default function Colorlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
    }, []);
    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState('');
    const showModal = (id) => {
        setOpen(true);
        setColorId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const { colors, isLoading, isError, isSuccess, message } = useSelector((state) => state.color);
    const dataSource = colors.map((ele, index) => ({
        key: index + 1,
        name: ele.title,
        action: <>
            <Link to={`/admin/color/${ele._id}`} className='fs-3 text-danger'><BiEdit /></Link>
            <button onClick={() => showModal(ele._id)}className='ms-3 fs-3 text-danger  bg-transparent border-0'><AiFillDelete /></button>
        </>
    }));
    const handleDeleteColor = (id) => {
        dispatch(deleteColor(id));
        setOpen(false);
    }
    return (
        <div>
            <h3 className="mb-4 title">Color List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
            <CustomModal performAction={() => { handleDeleteColor(colorId) }} title={'Are you sure you want to delete this color?'} open={open} hideModal={hideModal} />

        </div>
    )
}
