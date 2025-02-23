import React from 'react'
import { Table } from 'antd';
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
        title: 'Product',
        dataIndex: 'product',
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },

];

const dataSource = Array.from({
    length: 46,
}).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    product: `Product ${i}`,
    status: `Pay`,
}));
export default function Enquiries() {
    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}
