import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';


const getEnquirys = async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
}
const getEnquiry = async (id) => {
    const response = await axios.get(`${base_url}enquiry/${id}`,config);
    return response.data;
}
const updateEnquiry= async (id, enquiry) => {
    const response = await axios.put(`${base_url}enquiry/${id}`, enquiry,config);
    return response.data;
}
 const deleteEnquiry= async (id) => {
    const response = await axios.delete(`${base_url}enquiry/${id}`,config);
    return response.data;
}


const enquiryService = {
    getEnquirys,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry,
}
export default enquiryService;