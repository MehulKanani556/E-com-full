import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteBrand, getBrands } from '../features/brand/brandSlice';
import { Link, useParams } from 'react-router-dom';
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


export default function Brandlist() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBrands());
    }, []);
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState('');
    const showModal = (id) => {
        setOpen(true);
        setBrandId(id);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const { brands, isLoading, isError, isSuccess, message } = useSelector((state) => state.brand);
    const dataSource = brands.map((brand, index) => ({
        key: index + 1,
        name: brand.title,
        action: <>
            <Link to={`/admin/brand/${brand._id}`} className='fs-3 text-danger'><BiEdit /></Link>
            <button onClick={() => showModal(brand._id)} className='ms-3 fs-3 text-danger bg-transparent border-0'><AiFillDelete /></button>
        </>
    }));

    const handleDeleteBrand = (id) => {
        alert(id)
        dispatch(deleteBrand(id));
        setOpen(false);
    }

    return (
        <div>
            <h3 className="mb-4 title">Brand List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
            <CustomModal performAction={() => { handleDeleteBrand(brandId) }} title={'Are you sure you want to delete this brand?'} open={open} hideModal={hideModal} />
        </div>
    )
}
