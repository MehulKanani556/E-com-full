import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
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


export default function Brandlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBrands());
    }, []);
    const { brands, isLoading, isError, isSuccess, message } = useSelector((state) => state.brand);
    const dataSource = brands.map((brand, index) => ({
        key: index + 1,
        name: brand.title,
        action: <>
            <Link to={'/'} className='fs-3 text-danger'><BiEdit /></Link>
            <Link to={'/'} className='ms-3 fs-3 text-danger'><AiFillDelete /></Link>
        </>
    }));
    return (
        <div>
            <h3 className="mb-4 title">Brand List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
