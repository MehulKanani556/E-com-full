import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';


const getBlogs = async () => {
    const response = await axios.get(`${base_url}blog/`);
    return response.data;
}
const getBlog = async (id) => {
    const response = await axios.get(`${base_url}blog/${id}`,config);
    return response.data.blog;
}

const blogService = {
    getBlogs,
    getBlog,
}
export default blogService;