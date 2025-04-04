import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';


const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);   
    
    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data));
    }
    return response.data;
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
        localStorage.setItem('customer', JSON.stringify(response.data));
    }
    return response.data;
}
const getUserWishList = async () => {
    const response = await axios.get(`${base_url}user/wishlist`,config);
    return response.data;
}
const authService ={
    register,
    login,
    getUserWishList,
}
export default authService;