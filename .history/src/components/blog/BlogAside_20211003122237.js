import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, notification, Select, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import ButtonCustom from '../../features/button';
import { Link } from 'react-router-dom';
import requestAPI from '../../api/__test__';
import notificationCustom from '../../notification';
import moment from 'moment'
import axios from 'axios';
import classnames from 'classname';
import imgDe from './imageDefault.jpg';
import Spinner from 'react-bootstrap/Spinner'

export default function BlogAside(props) {
    // const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/remalw/upload"
    // const CLOUDINARY_UPLOAD_PRESET = "mbookImage"
    const { Option } = Select;
    const [categoryData, setCategoryData] = useState();
    const categories = [];
    const [postAPI, setPostAPI] = useState()
    const [btnLoading, setBtnLoading] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [post, setPost] = useState({ title: "", sub: "", content: "", urlImage: 'http://res.cloudinary.com/remalw/image/upload/v1620066495/m-book/z7ftb1kemz1temydh5c6.jpg' })
    const [visible, setVisible] = useState(false);
    const [displayImage, setDisplayImage] = useState(imgDe);
    // Render Thể Loại
    useEffect(() => {

        requestAPI('/category/get', 'GET')
            .then(res => {
                if (res) {
                    console.log(res.data);
                    setCategoryData(res.data)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.response);
                }
            })
    }, [])
    categoryData?.map((item, index) => {
        categories.push(<Option key={index}>{item.name}</Option>);
    })
    // Get value add 
    function handleChangeCategory(value) {
        console.log({ value });
        setPost({
            ...post,
            categoryCode: value
        })
    }
    // Upload Image Post
    const handleChangeImage = async (e) => {
        setImgLoading(true);
        const files = e.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'mbookImage')
        axios.post('https://api.cloudinary.com/v1_1/remalw/upload', data)
            .then(res => {
                setPost({ ...post, urlImage: res.data.url })
                setImgLoading(false);
                setDisplayImage(res.data.url)
                setBtnLoading(true);
            })
            .catch(err => {
                console.log(err);
                setImgLoading(false);
            })

    };
    const handleChangePost = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }
    const postBlog = (post) => {
        post.createddate = new Date();
        console.log({ post });
        requestAPI('/poster/upload', 'POST', post, { Authorization: `Bearer-${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    if (res.status === 403) {
                        notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chắc năng này`, "warning")
                        return;
                    }
                    notificationCustom("Thông Báo", `Đăng bài thành công  `, "success")
                    setPost({ title: "", sub: "", content: "" })
                    setPostAPI(res.data)
                    props.poster(res.data)
                    console.log(res.data);
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chắc năng này`, "warning")
                    }
                    if (err.response.status === 500) {
                        notificationCustom("Nhắc Nhở", `Tiêu đề và phụ đề không được dài quá 255 kí tự`, "warning")
                    }
                }
            })
    }

    const onUploadImage = () => {
        const btnUpload = document.getElementById("btnUploadImage")
        btnUpload.click();
    }



    return (
        <Col className="blog__container-aside" xs={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <div className="blog__container-aside-wrapper">
                <div onClick={() => setVisible(true)} >
                    <ButtonCustom nameButton="Đăng Bài" icon="cloud-upload" />
                </div>
                <Modal
                    title="Đăng Blog"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[
                        !imgLoading && <Button onClick={() => postBlog(post)} key="back" type="primary submit" shape="round" icon={<UploadOutlined />} size="large" >Đăng</Button>,
                    ]}
                >
                    <form onSubmit={postBlog} action="/poster/upload" method="POST" enctype="multipart/form-data" className="blog__container-aside-wrapper-upload">
                        <Row>
                            <Col span={16}>
                                <div className="blog__container-aside-wrapper-upload-content">
                                    <div className="blog__container-aside-wrapper-upload-content-box">
                                        <h3 className="blog__container-aside-wrapper-upload-content-box-title">Tiêu Đề</h3>
                                        <input className="blog__container-aside-wrapper-upload-content-box-txt" onChange={handleChangePost} name="title" value={post.title} type="text" placeholder="Nhập tiêu đề bài viết ... " />
                                        <span class="focus-border">
                                            <i></i>
                                        </span>

                                    </div>
                                    <div className="blog__container-aside-wrapper-upload-content-box">
                                        <h3 className="blog__container-aside-wrapper-upload-content-box-title">Thể Loại</h3>
                                        <Select mode="tags" style={{ width: '100%' }} placeholder="Chọn Thể Loại" onChange={handleChangeCategory}>
                                            {categories}
                                        </Select>
                                    </div>

                                    <div className="blog__container-aside-wrapper-upload-content-box">
                                        <h3 className="blog__container-aside-wrapper-upload-content-box-title">Phụ Đề</h3>
                                        <input className="blog__container-aside-wrapper-upload-content-box-sub" onChange={handleChangePost} name="sub" value={post.sub} type="text" placeholder="Nhập phụ đề bài viết ... " />
                                        <span class="focus-border">
                                            <i></i>
                                        </span>
                                    </div>
                                    <div className="blog__container-aside-wrapper-upload-content-box">
                                        <h3 className="blog__container-aside-wrapper-upload-content-box-title">Nội Dung</h3>
                                        <textarea rows="6" className="blog__container-aside-wrapper-upload-content-box-content"
                                            name="content"
                                            onChange={handleChangePost}
                                            placeholder="Nhập nội dung bài viết ... "
                                            value={post.content}
                                            required autocomplete="off">
                                        </textarea>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8} className="">
                                <div className="blog__container-aside-wrapper-upload-image" style={{ backgroundImage: `url(${displayImage})` }}>
                                    <input
                                        type='file'
                                        accept="image/*"
                                        onChange={handleChangeImage}
                                        id="btnUploadImage"
                                        hidden
                                    />
                                    {!imgLoading ? <Button onClick={() => onUploadImage()}
                                        className={classnames("", { "blog__container-aside-wrapper-upload-image-btn": !imgLoading })}
                                        id="btnFrontUpload" key="back" type="primary submit" shape="round" icon={<UploadOutlined />} size="large" >Tải Ảnh Lên</Button>
                                        : <Spinner animation="grow" size="sm" />
                                    }
                                </div>
                            </Col>
                        </Row>

                    </form>

                </Modal>

            </div>
            <div className="blog__container-aside-wrapper blog__container-aside-wrapper-recommend">
                <div className="blog__container-aside-wrapper-title">
                    <h3 className="blog__container-aside-wrapper-title-text" >Bài viết gần đây</h3>
                </div>
                <div className="blog__container-aside-wrapper-post">
                    <ul className="blog__container-aside-wrapper-post-list">
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Cảm nhận đắc nhâm tâm sau 2 ngày
                            </Link>
                        </li>
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                CAnh da đen và những người bạn
                            </Link>
                        </li>

                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Đừng quên tên anh
                            </Link>
                        </li>
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Bố già và những câu chuyện
                            </Link>
                        </li>
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Cảm nhận đắc nhâm tâm sau 2 ngày
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>
            <div className="blog__container-aside-wrapper blog__container-aside-wrapper-recommend">
                <div className="blog__container-aside-wrapper-title">
                    <h3 className="blog__container-aside-wrapper-title-text" >Bình luận gần đây</h3>
                </div>
                <div className="blog__container-aside-wrapper-post">
                    <ul className="blog__container-aside-wrapper-post-list">
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-comments-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Cảm nhận đắc nhâm tâm sau 2 ngày
                            </Link>
                        </li>
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-comments-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Anh da đen và những người bạn
                            </Link>
                        </li>

                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-comments-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Đừng quên tên anh
                            </Link>
                        </li>
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-comments-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Bố già và những câu chuyện
                            </Link>
                        </li>
                        <li className="blog__container-aside-wrapper-post-item">
                            <span className="blog__container-aside-wrapper-post-icon">
                                <i class="fa fa-comments-o" aria-hidden="true"></i>
                            </span>
                            <Link className="blog__container-aside-wrapper-post-link">
                                Cảm nhận đắc nhâm tâm sau 2 ngày
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>

        </Col>

    )
}