import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEnquiry, updateEnquiry } from '../features/enquiry/enquirySlice';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';

export default function Viewenq() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enquiry, isLoading, isError, isSuccess, message } = useSelector((state) => state.enquiry);

    useEffect(() => {
        if (id !== undefined) {
            dispatch(getEnquiry(id));
        }
    }, [id]);
    const goBack = () => {
        
        navigate(-1);
    }
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">

                <h3 className="mb-4 title">View Enquiry</h3>
                <button className='bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1' onClick={goBack}><BiArrowBack className='fs-5'/> Go Back</button>
            </div>
            <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Name:</h6>
                    <p className="mb-0">{enquiry.name}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Mobile:</h6>
                    <a href={`tel:+91${enquiry.mobile}`} className="mb-0 text-dark text-decoration-none">{enquiry.mobile}</a>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Email:</h6>
                    <a href={`mailto:${enquiry.email}`} className="mb-0 text-dark text-decoration-none">{enquiry.email}</a>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Comment:</h6>
                    <p className="mb-0">{enquiry.comment}</p>
                </div>
                <div className="d-flex align-items-center gap-3">
                    <h6 className="mb-0">Status:</h6>
                    {/* <p className="mb-0">{enquiry.status}</p> */}
                    <div>
                        <select
                            name="status"
                            id="status"
                            className='form-control form-select'
                            value={enquiry?.status || ""}
                            onChange={(e) => {
                                const data = {
                                    id: enquiry?._id,
                                    status: e.target.value
                                };
                                dispatch(updateEnquiry(data));
                                dispatch(getEnquiry(id));
                            }}
                        >
                            <option value="">Select Status</option>
                            <option value="Submitted">Submitted</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Process">In Process</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
