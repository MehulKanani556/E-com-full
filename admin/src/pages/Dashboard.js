import React from 'react';
import { BsArrowDownRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
// Chart
const data = [
  { type: 'Jan', sales: 0.32 },
  { type: 'Feb', sales: 0.28 },
  { type: 'Mar', sales: 0.36 },
  { type: 'Apr', sales: 0.42 },
  { type: 'May', sales: 0.38 },
  { type: 'Jun', sales: 0.45 },
  { type: 'Jul', sales: 0.40 },
  { type: 'Aug', sales: 0.43 },
  { type: 'Sep', sales: 0.41 },
  { type: 'Oct', sales: 0.44 },
  { type: 'Nov', sales: 0.39 },
  { type: 'Dec', sales: 0.46 }
];

const config = {
  data: data,
  xField: 'type',
  yField: 'sales',
  color: '#ffd333',
  label: {
    position: 'top',
    style: {
      fill: '#000'
    },
    text: (d) => `${(d.sales * 100).toFixed(1)}%`,
    textBaseline: 'bottom',
  },
  axis: {
    y: {
      labelFormatter: '.0%',
    },
    x: {
      label: {
        autoRotate: false,
        autoHide: true
      },
    }
  },
  style: {
    radiusTopLeft: 10,
    radiusTopRight: 10,
  },
};

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

export default function Dashboard() {
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3 flex-wrap'>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Revenue</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='text-success'><BsArrowDownRight /> 33%</h6>
            <p className='mb-0 desc'>Compared to April 2025</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Sales</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='text-danger'><BsArrowDownRight /> 33%</h6>
            <p className='mb-0 desc'>Compared to April 2025</p>
          </div>
        </div>
        <div className='d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3'>
          <div>
            <p className='desc'>Total Profit</p>
            <h4 className='mb-0 sub-title'>$1100</h4>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <h6 className='text-success'><BsArrowDownRight /> 33%</h6>
            <p className='mb-0 desc'>Compared to April 2025</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5">Income Statistics</h3>
        <div className="bg-white p-3 rounded-3">
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
     
    </div>
  );
}