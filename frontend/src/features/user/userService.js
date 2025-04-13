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
const addToCart = async (data) => {
    const response = await axios.post(`${base_url}user/cart`,data,config);
    return response.data;
}
const getCart = async () => {
    const response = await axios.get(`${base_url}user/cart`,config);
    return response.data;
}
const removeProdCart = async (id) => {
    const response = await axios.post(`${base_url}user/delete-product-cart`,{cartItemId:id},config);
    return response.data;
}
const updateProdCart = async (data) => {
    const response = await axios.post(`${base_url}user/update-product-cart`,{cartItemId:data.cartItemId,newQuantity:data.newQuantity},config);
    return response.data;
}
const createOrder  = async (data) => {
    const response = await axios.post(`${base_url}user/cart/create-order`,{data},config);
    return response.data;
}
const authService ={
    register,
    login,
    getUserWishList,
    addToCart,
    getCart,
    removeProdCart,
    updateProdCart,
    createOrder
}
export default authService;