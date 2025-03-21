import axios from 'axios';
import { base_url } from '../../utils/base_url';


const getEnquirys = async () => {
    const response = await axios.get(`${base_url}enquiry/`);
    return response.data;
}


const enquiryService = {
    getEnquirys,
}
export default enquiryService;