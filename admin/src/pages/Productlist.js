import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
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
        defaultSortOrder: "descend",
        sorter: (a, b) => {
            if (!a.title) return -1;
            if (!b.title) return 1;
            return a.title.length - b.title.length;
        },
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        defaultSortOrder: "descend",
        sorter: (a, b) => {
            if (!a.brand) return -1;
            if (!b.brand) return 1;
            return a.brand.length - b.brand.length;
        },


    },
    {
        title: 'Category',
        dataIndex: 'category',
        defaultSortOrder: "descend",
        sorter: (a, b) => {
            if (!a.category) return -1;
            if (!b.category) return 1;
            return a.category.length - b.category.length;
        },

    },
    {
        title: 'Color',
        dataIndex: 'color',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
    },
    {
        title: 'Action',
        dataIndex: 'action',
    },

];


export default function Productlist() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
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
    const { products, isLoading, isError, isSuccess, message } = useSelector((state) => state.product);
    // const dataSource = Array.from({
    //     length: 46,
    // }).map((_, i) => ({
    //     key: i,
    //     name: `Edward King ${i}`,
    //     product: `Product ${i}`,
    //     status: `Pay`,
    // }));
    const dataSource = products.map((product, index) => ({
        key: index + 1,
        title: product.title,
        brand: product.brand,
        category: product.category,
        color: product.color.join(', '),
        price: `$${product.price}`,
        action: <>
            <Link to={`/admin/product/${product._id}`} className='fs-3 text-danger'><BiEdit /></Link>
            <button onClick={() => showModal(product._id)} className='ms-3 fs-3 text-danger  bg-transparent border-0'><AiFillDelete /></button>
        </>
    }));
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
        setOpen(false);
    }
    return (
        <div>
            <h3 className="mb-4 title">Product List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
            <CustomModal performAction={() => { handleDelete(id) }} title={'Are you sure you want to delete this product?'} open={open} hideModal={hideModal} />

        </div>
    )
}
