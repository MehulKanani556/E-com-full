import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import watch from '../images/watch.jpg'
import Container from '../components/Container'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getCart } from '../features/user/userSlice'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { config } from '../utils/axiosconfig'

const checkoutSchema = Yup.object().shape({
    country: Yup.string().required('Country is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    address: Yup.string().required('Address is required'),
    apartment: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('pincode is required')
});

export default function Checkout() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const { cart } = useSelector((state) => state.auth);
    const [totalAmount, setTotalAmount] = useState(null);
    const user = JSON.parse(localStorage.getItem('customer'));
    const [shippingInfo, setShippingInfo] = useState(null);
    const [paymentInfo, setPaymentInfo] = useState({ razorpayPaymentId: "", razorpayOrderId: "" });
    const [cartProductState,setCartProductState] = useState([])
    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    // Calculate total once when cart changes
    useEffect(() => {
        if (cart) {
            let total = 0;
            cart.forEach(item => {
                total += item.price * item.quantity;
            });
            setTotalAmount(total);
        }
    }, [cart]);


    const initialValues = {
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        pincode: ''
    };

    const handleSubmit = (values) => {
        console.log(values);
        setShippingInfo(values);
        checkOutHandler(values);
    };

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script)
        })
    }
    useEffect(() => {
        const items = cart.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
            color: item.color._id,
            price: item.price,
        }));
        setCartProductState(items);
        console.log(items);
    }, [cart]);
    const checkOutHandler = async (shippingInfo) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if (!res) {
            alert("Razorpay SDK failed to Load");
            return;
        }
        const result = await axios.post('http://localhost:5000/api/user/order/checkout', {amount:totalAmount+5}, config)
        if (!result) {
            alert("Something went wrong");
            return;
        }
        const { amount, id, currency } = result.data.order;
        const options = {
            key: "rzp_test_DgVHSf7vpxL6oc", // Enter the Key ID generated from the Dashboard
            amount: amount?.toString(),
            currency: currency,
            name: "Soumya Corp.",
            description: "Test Transaction",
            order_id: id,
            handler: async function (response) {
                const data = {
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    shippingInfo: shippingInfo // Include shipping information
                };

                const result = await axios.post("http://localhost:5000/api/user/order/paymentVerification", data, config);
                setPaymentInfo({
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                })
                
                dispatch(createOrder({ 
                    totalPrice: totalAmount, 
                    totalPriceAfterDiscount: totalAmount, 
                    orderItems: cartProductState, 
                    paymentInfo: { 
                        razorpayPaymentId: response.razorpay_payment_id, 
                        razorpayOrderId: response.razorpay_order_id 
                    }, 
                    shippingInfo 
                }));

                // alert(result.data.msg);
            },
            prefill: {
                name: user.firstname + " " + user.lastname,
                email: user.email,
                contact: user.mobile || "9999999999",
            },
            notes: {
                address: shippingInfo ? `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pincode}` : "",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }

    return (
        <>
            <Container class1="checkout-wrapper py-5 home-wrapper-2 ">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Dev corner</h3>
                            <nav style={{ "--bs-breadcrumb-divider": ">" }} aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item total-price"><Link to="/cart" className='text-dark'>Cart </Link></li> &nbsp;/
                                    <li className="breadcrumb-item total-price active" aria-current="page">Information</li>&nbsp;/
                                    <li className="breadcrumb-item total-price active ">Shipping</li> &nbsp;/
                                    <li className="breadcrumb-item total-price active" aria-current="page">Payment</li>
                                </ol>
                            </nav>
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details total">{user.firstname + " " + user.lastname} ({user.email})</p>
                            <h4 className='mb-3'>Shipping Address</h4>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={checkoutSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form className='d-flex gap-15 flex-wrap justify-content-between'>
                                        <div className='w-100'>
                                            <Field as="select" name="country" className={`form-control form-select ${touched.country && errors.country ? 'is-invalid' : ''}`}>
                                                <option value="" selected disabled>Select Country</option>
                                                <option value="US">United States</option>
                                                <option value="CA">Canada</option>
                                            </Field>
                                            <ErrorMessage name="country" component="div" className="text-danger" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <Field type="text" name="firstName" placeholder='First Name' className={`form-control ${touched.firstName && errors.firstName ? 'is-invalid' : ''}`} />
                                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <Field type="text" name="lastName" placeholder='Last Name' className={`form-control ${touched.lastName && errors.lastName ? 'is-invalid' : ''}`} />
                                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                                        </div>
                                        <div className='w-100'>
                                            <Field type="text" name="address" placeholder='Address' className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`} />
                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                        </div>
                                        <div className='w-100'>
                                            <Field type="text" name="apartment" placeholder='Apartment, Suite ,etc' className="form-control" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <Field type="text" name="city" placeholder='City' className={`form-control ${touched.city && errors.city ? 'is-invalid' : ''}`} />
                                            <ErrorMessage name="city" component="div" className="text-danger" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <Field as="select" name="state" className={`form-control form-select ${touched.state && errors.state ? 'is-invalid' : ''}`}>
                                                <option value="" selected disabled>State</option>
                                                <option value="CA">California</option>
                                                <option value="NY">New York</option>
                                            </Field>
                                            <ErrorMessage name="state" component="div" className="text-danger" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <Field type="text" name="pincode" placeholder='pincode' className={`form-control ${touched.pincode && errors.pincode ? 'is-invalid' : ''}`} />
                                            <ErrorMessage name="pincode" component="div" className="text-danger" />
                                        </div>
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Link to="/cart" className='text-dark'><BiArrowBack className='me-2' /> Return To Cart</Link>
                                                <Link to="/cart" className='text-dark'><BiArrowBack className='me-2' /> Continue To Shipping</Link>
                                                <button type="submit" className='button'>Place Order</button>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {cart && cart.map((item, index) => {
                                return (
                                    <div className="d-flex gap-10 mb-2 align-items-center" key={index}>
                                        <div className='d-flex w-75 gap-10'>
                                            <div className='w-25 position-relative'>
                                                <img className='' width={100} height={100} src={item.productId?.images?.[0].url} alt="product" />
                                                <span style={{ top: '-10px', right: '2px' }} className="badge bg-secondary text-white rounded-circle p-2 position-absolute">{item.quantity}</span>
                                            </div>
                                            <div>
                                                <h5 className="total-price">{item.productId.title}</h5>
                                                <p className="total-price d-flex align-items-center gap-2"> <div className='rounded-pill' style={{ backgroundColor: item.color.title, width: '15px', height: '15px' }}></div></p>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className='total'>$ {item.price * item.quantity}</h5>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='total'>Subtotal</p>
                                <p className='total-price'>$ {totalAmount}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='mb-0 total'>Shipping</p>
                                <p className='mb-0 total-price'>$ 5</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className='total'>Total</h4>
                            <h5 className='total-price '>$ {totalAmount + 5}</h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
