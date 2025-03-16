import axios from 'axios';
import { base_url } from '../../utils/base_url';
const getToken = localStorage.getItem('token') ? localStorage.getItem('token') : null;

const config = {
    headers: {
        Authorization: `Bearer ${getToken}`,
        Accept: 'application/json'
    }
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/admin-login`, userData);
    if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;

}
const getOrders = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${base_url}user/get-orders`, config);
    return response.data;
}


const authService = {
    login,
    getOrders,
}
export default authService;