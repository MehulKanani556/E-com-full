import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import { AiOutlineBgColors, AiOutlineDashboard, AiOutlinePicLeft, AiOutlinePicRight, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { FaBloggerB, FaClipboardList } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <h2 className="text-white fs-5 text-center py-3 mb-0" >
            <span className='sm-logo'>Ad</span>
            <span className='lg-logo'>Admin</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == 'signout') {

            } else {
              navigate(`/admin/${key}`);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Add product',
                },
                {
                  key: 'product-list',
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand',
                },
                {
                  key: 'brand-list',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Brand List',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category',
                },
                {
                  key: 'category-list',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color List',
                },
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog-list',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className='fs-4' />,
                  label: 'Blog Category List',
                },
              ]
            },
            {
              key: 'enquiries',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className='d-flex justify-content-between ps-1 pe-5'
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlinePicRight className='fs-4' /> : <AiOutlinePicLeft className='fs-4' />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <IoIosNotifications className='fs-4' />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown"  >
              <div className="">
                <img width={32} height={32} src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg" alt="" />
              </div>
              <div role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                <h5 className='mb-0'>Mehul</h5>
                <p className='mb-0'>mkanani556@gmail.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">

                <li className="py-2 "><Link to="/action" className="dropdown-item py-1 mb-1" style={{ "height": "auto", lineHeight: '20px' }}>View Profile</Link></li>
                <li className="py-2 "><Link to="/something-else" className="dropdown-item py-1 mb-1" style={{ "height": "auto", lineHeight: '20px' }}>Signout</Link></li>

              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout >
  );
};
export default MainLayout;