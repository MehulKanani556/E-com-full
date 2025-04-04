import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const createContact= async (contact) => {
    const response = await axios.post(`${base_url}enquiry/`, contact,config);
    return response.data;
}



const contactService = {
    createContact,
}
export default contactService;