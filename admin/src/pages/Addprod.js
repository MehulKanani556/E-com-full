import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import { InboxOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { getBrands } from '../features/brand/brandSlice';
import "react-widgets/styles.css";
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import { Multiselect } from 'react-widgets/cjs';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createProduct } from '../features/product/productSlice';

export default function Addprod() {
    const dispatch = useDispatch();
    const color = [];
    const [selectedColor, setSelectedColor] = useState([]);
    const [imgs, setImgs] = useState([]);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
    }, []);

    const { brands } = useSelector((state) => state.brand);
    const { pCategories } = useSelector((state) => state.pcategory);
    const { colors } = useSelector((state) => state.color);
    const { images } = useSelector((state) => state.upload);
    colors.forEach(i => {
        color.push({
            _id: i._id,
            color: i.title,
        });
    });
    const img = [];
    images.forEach(i => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    useEffect(() => {
        formik.values.color = selectedColor;
        formik.values.images = img;
    }, [color, imgs]);

    let userSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('price is required'),
        brand: Yup.string().required('Brand is required'),
        category: Yup.string().required('Category is required'),
        color: Yup.array()
            .min(1, 'Please select at least one color')
            .required('Color is required'),
        quantity: Yup.number().required('Quantity is required'),
    });
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            color: [],
            quantity: '',
            images: [],
        },
        validationSchema: userSchema,
        onSubmit: values => {
            console.log(values);
            dispatch(createProduct(values));
            // dispatch(login(values))
        },
    });
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div className="">
                <form action="" className='d-flex gap-1 flex-column' onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter Title"
                        name="title"
                        val={formik.values.title}
                        onCh={formik.handleChange('title')}
                        onBl={formik.handleBlur('title')}

                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title && <div >{formik.errors.title}</div>}
                    </div>
                    <div className="">
                        <ReactQuill
                            theme="snow"
                            // value={desc}
                            name="title"
                            value={formik.values.description}
                            onChange={formik.handleChange('description')}
                            onBl={formik.handleBlur('description')}
                        />
                        <div className="error">
                            {formik.touched.description && formik.errors.description && <div >{formik.errors.description}</div>}
                        </div>
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        val={formik.values.price}
                        onCh={formik.handleChange('price')}
                        onBl={formik.handleBlur('price')}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price && <div >{formik.errors.price}</div>}
                    </div>
                    <select
                        name="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange('brand')}
                        onBlur={formik.handleBlur('brand')}
                        id=""
                        className=' form-select  py-3'>
                        <option value="" >Select Brand</option>
                        {brands && brands.map((br) => {
                            return (
                                <option key={br._id} value={br.title}>{br.title}</option>
                            )
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.brand && formik.errors.brand && <div >{formik.errors.brand}</div>}
                    </div>
                    <select
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}

                        className=" form-select  py-3 " id="">
                        <option value="" >Select Category</option>
                        {pCategories && pCategories.map((ele) => {
                            return (
                                <option key={ele._id} value={ele.title}>{ele.title}</option>
                            )
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category && <div >{formik.errors.category}</div>}
                    </div>

                    <Multiselect
                        dataKey="id"
                        textField="color"
                        data={color}
                        name="color"
                        onChange={(e) => {
                            formik.setFieldValue('color', e);
                            setSelectedColor(e);
                        }}
                    />

                    <div className="error">
                        {formik.touched.color && formik.errors.color && <div >{formik.errors.color}</div>}
                    </div>


                    <CustomInput
                        name="quantity"
                        val={formik.values.quantity}
                        onCh={formik.handleChange('quantity')}
                        onBl={formik.handleBlur('quantity')}
                        type="number"
                        label="Enter Product Quantity"

                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity && <div >{formik.errors.quantity}</div>}
                    </div>
                    <div className="bg-white border-1 p-5 text-center">
                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {images.map((i, j) => {
                            return (
                                <div key={j} className="m-2 position-relative">
                                    <button type='button' className='btn-close position-absolute ' onClick={() => dispatch(deleteImg(i.public_id))} style={{ top: '10px', left: '10px' }} ></button>
                                    <img src={i.url} alt={i.name} width={200} height={200} />
                                </div>
                            )
                        })}

                    </div>


                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">Add Product</button>
                </form>
            </div>
        </div>
    )
}
