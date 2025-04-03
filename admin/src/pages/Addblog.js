import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { createBlog, getBlog, updateBlog } from '../features/blogs/blogSlice';
import { getCategories } from '../features/bcategory/bcategorySlice';
export default function Addblog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const img = [];
    const { id } = useParams();
    const [imgs, setImgs] = useState([]);
  
    useEffect(() => {
        dispatch(getCategories());
    }, []);
    const { bCategories } = useSelector((state) => state.bcategory);
    const { blog, isSuccess, isError, isLoading, message } = useSelector((state) => state.blog);
    const { images } = useSelector((state) => state.upload);
    useEffect(() => {
        if (id !== undefined) {
            dispatch(getBlog(id));            
        }
    }, [id]);
    useEffect(() => {
        if (isSuccess) {
            toast.success('Blog Added Successfully');
        }
        if (isError) {
            toast.error(message || 'Something went wrong');
        }

    }, [isSuccess, isError, isLoading]);
    images.forEach(i => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });
    useEffect(() => {
        formik.values.images = img;
    }, [img]);
    let schema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        category: Yup.string().required('Category is required'),
    });
    console.log(blog.images)
    const formik = useFormik({
        initialValues: {
            title: blog.title ||'',
            description: blog.description||'',
            category:blog.category|| '',
            images: blog.images||[],
        },
        validationSchema: schema,
        onSubmit: values => {
            // console.log(values);
            if(id){
                dispatch(updateBlog({id,...values}));
            }else{
                dispatch(createBlog(values));
            }
            formik.resetForm();
            setImgs([]);

            setTimeout(() => {
                navigate('/admin/blog-list');
            }, 3000);

            // dispatch(login(values))
        },
    });
   
    useEffect(() => {
        if (blog.title && id) {
            formik.setFieldValue('title', blog.title);
        }
        if (blog.description && id) {
            formik.setFieldValue('description', blog.description);
        }
        if (blog.category && id) {
            formik.setFieldValue('category', blog.category);
        }
        if (blog.images && id) {
            formik.setFieldValue('images', blog.images);
        }
    }, [blog]);
    return (
        <div>
            <h3 className="mb-4 title">{id ? 'Edit' : 'Add'} Blog</h3>
            <div className="">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mt-4">
                        <CustomInput
                            type="text"
                            label="Enter Blog Title"
                            name="title"
                            val={formik.values.title}
                            onCh={formik.handleChange('title')}
                            onBl={formik.handleBlur('title')} />
                        <div className="error">
                            {formik.touched.title && formik.errors.title && <div >{formik.errors.title}</div>}
                        </div>
                    </div>
                    <div className="mb-3">

                        <select
                            name="category"
                            value={formik.values.category}
                            onChange={formik.handleChange('category')}
                            onBlur={formik.handleBlur('category')}
                            className="form-select pt-3 mt-3" id="">
                            <option value="" >Select Blog Category</option>
                            {bCategories && bCategories.map((ele) => {
                                return (
                                    <option key={ele._id} value={ele.title}>{ele.title}</option>
                                )
                            })}
                        </select>
                        <div className="error">
                            {formik.touched.category && formik.errors.category && <div >{formik.errors.category}</div>}
                        </div>
                    </div>
                    <ReactQuill theme="snow"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange('description')}
                        onBl={formik.handleBlur('description')}
                    />
                    <div className="error">
                        {formik.touched.description && formik.errors.description && <div >{formik.errors.description}</div>}
                    </div>
                    <div className="bg-white border-1 p-5 mt-3 text-center">
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
                                    <img src={i.url} width={200} height={200} alt="uploaded" />
                                </div>
                            )
                        })}
                        {/* {blog.images && blog.images.map((i, j) => {
                            return (
                                <div key={j} className="m-2 position-relative">
                                    <button type='button' className='btn-close position-absolute ' onClick={() => dispatch(deleteImg(i?.public_id))} style={{ top: '10px', left: '10px' }} ></button>
                                    <img src={i.url} width={200} height={200} alt="blog" />
                                </div>
                            )
                        })} */}
                    </div>
                    <button type="submit" className="btn btn-success border-0 rounded-3 my-5 ">{id ? 'Edit' : 'Add'}     Blog</button>
                </form>
            </div>
        </div>
    )
}
