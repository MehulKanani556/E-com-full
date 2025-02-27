import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';
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

];

export default function Customers() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    const { customers, isLoading, isError, isSuccess, message } = useSelector((state) => state.customer);
    
    const dataSource = customers?.filter(customer => customer.role !== 'admin').map((customer, index) => ({
        key: index,
        name: customer.firstname + " " + customer.lastname,
        email: customer.email,
        mobile: customer.mobile || "N/A"
    }));

    return (
        <div>
            <h3 className="mb-4 title">Customers</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
