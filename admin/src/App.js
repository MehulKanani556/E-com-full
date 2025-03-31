import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgotpassword';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Brandlist from './pages/Brandlist';
import Categorylist from './pages/Categorylist';
import Productlist from './pages/Productlist';
import Addblog from './pages/Addblog';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import Addcat from './pages/Addcat';
import Addbrand from './pages/Addbrand';
import Addprod from './pages/Addprod';
import Addcoupon from './pages/Addcoupon';
import Couponlist from './pages/Couponlist';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/reset-password" element={<Resetpassword />} />
        <Route exact path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='blog-list' element={<Bloglist />} />
          <Route path='blog' element={<Addblog />} />
          <Route path='blog-category' element={<Addblogcat />} />
          <Route path='blog-category-list' element={<Blogcatlist />} />
          <Route path='orders' element={<Orders />} />
          <Route path='customers' element={<Customers />} />
          <Route path='color-list' element={<Colorlist />} />
          <Route path='color' element={<Addcolor />} />
          <Route path='coupon' element={<Addcoupon />} />
          <Route path='coupon-list' element={<Couponlist />} />
          <Route path='brand-list' element={<Brandlist />} />
          <Route path='brand' element={<Addbrand />} />
          <Route path='brand/:id' element={<Addbrand />} />
          <Route path='category-list' element={<Categorylist />} />
          <Route path='category' element={<Addcat />} />
          <Route path='product-list' element={<Productlist />} />
          <Route path='product' element={<Addprod />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
