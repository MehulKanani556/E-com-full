import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../features/color/colorSlice';
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
    const { colors, isLoading, isError, isSuccess, message } = useSelector((state) => state.color);
    const dataSource = colors.map((ele, index) => ({
        key: index + 1,
        name: ele.title,
        action: <>
            <Link to={'/'} className='fs-3 text-danger'><BiEdit /></Link>
            <Link to={'/'} className='ms-3 fs-3 text-danger'><AiFillDelete /></Link>
        </>
    }));
    return (
        <div>
            <h3 className="mb-4 title">Color List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
