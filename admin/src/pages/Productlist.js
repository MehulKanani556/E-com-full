import React, { useEffect } from 'react'
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
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
        sorter: (a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g,"")) - parseFloat(b.price.replace(/[^0-9.-]+/g,""))
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
        color: product.color,
        price: `$${product.price}`,
        action: <>
            <Link to={'/'} className='fs-3 text-danger'><BiEdit /></Link>
            <Link to={'/'} className='ms-3 fs-3 text-danger'><AiFillDelete /></Link>
        </>
    }));
    return (
        <div>
            <h3 className="mb-4 title">Product List</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
