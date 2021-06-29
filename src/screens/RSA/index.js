import React, { useState } from 'react'
import { Row, Col, Modal, notification, Upload, Select, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { SmileOutlined, PoweroffOutlined } from '@ant-design/icons';
import ButtonCustom from '../../features/button';
import ImgCrop from 'antd-img-crop';
// import imgBlog1 from './blog1.png'
import { Link } from 'react-router-dom';
import requestAPI from '../../api';
import notificationCustom from '../../notification';
import axios from 'axios';
export default function Index() {
    const [dataE, setDataE] = useState({ p: "", q: "", e: "" })
    const [dataRecieved, setDataRecieved] = useState()
    const [message, setMessage] = useState({
        type: "ENCRYPT",
        message: ''
    })
    const [messageE, setMessageE] = useState({
        type: "DECRYPT",
        message: '',
        d: "",
        n: ""
    })
    const [messageD, setMessageD] = useState({ message: '' })
    const [visible, setVisible] = useState(false);
    const handleChangeEncrypt = (e) => {
        setDataE({
            ...dataE,
            [e.target.name]: e.target.value
        })
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeMessage = (e) => {
        setMessage({
            ...message,
            message: e.target.value
        })
    }
    const handleChangeMessageEncrypt = (e) => {
        setMessageE({
            ...messageE,
            n: dataRecieved?.n,
            [e.target.name]: e.target.value
        })
    }
    const postGenerateKey = (data) => {
        requestAPI('/rsa/dKeyGen', 'POST', data)
            .then(res => {
                if (res) {
                    if (res.status === 500 || res.status === 405) {
                        notificationCustom("Nhắc Nhở", `Tạo Khóa thất bại, Vui lòng thử lại`, "warning")
                        return;
                    }
                    setDataRecieved(res.data)
                    console.log(res.data);
                    notificationCustom("Thông Báo", `Tạo khóa thành công`, "success")
                }
            })
            .catch(err => {
                console.log(err);
                notificationCustom("Nhắc Nhở", `Giá trị E sai ( 1 < e < Øn)`, "warning")
            })

    }
    const postMessage = (data) => {
        const msg = Object.assign(data, dataRecieved);
        console.log(msg);
        requestAPI('/rsa/rsaProcess', 'POST', msg)
            .then(res => {
                if (res) {
                    if (res.status === 500 || res.status === 405) {
                        notificationCustom("Nhắc Nhở", `Gửi Tin Nhắn Thất Bại, Vui lòng thử lại`, "warning")
                        return;
                    }
                    notificationCustom("Thông Báo", `Gửi dữ kiện mã khóa thành công `, "success")
                    let msgE = res.data.message
                    setMessageE({ ...messageE, message: msgE })
                    console.log(res.data)

                }
            })
            .catch(err => {
                console.log(err);
                notificationCustom("Nhắc Nhở", `Lỗi`, "warning")
            })

    }
    const postMessageE = (data) => {
        console.log(data);
        requestAPI('/rsa/rsaProcess', 'POST', data)
            .then(res => {
                if (res) {
                    if (res.status === 500 || res.status === 405) {
                        notificationCustom("Nhắc Nhở", `Gửi Tin Nhắn Thất Bại, Vui lòng thử lại`, "warning")
                        return;
                    }
                    notificationCustom("Thông Báo", `Gửi dữ kiện mã khóa thành công `, "success")
                    setMessageD(res.data)
                    console.log(res.data)
                }
            })
            .catch(err => {
                console.log(err);
                notificationCustom("Nhắc Nhở", `Lỗi : ( Số vượt qua N hoặc không phải số) `, "warning")
            })

    }
    return (
        <div className="container-wrapper">
            <Col className="blog__container-aside">
                <div className="blog__container-aside-wrapper">
                    <div onClick={() => setVisible(true)} style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <ButtonCustom nameButton="Tạo Khóa & Gửi Message Chữ" icon="cloud-upload" />
                        <div className="header__social">
                            <Link className="header__social-wrapper" to="/RSAText">
                                <span className="header__social-wrapper-btn"><i class="far fa-arrow-alt-circle-right"></i></span>
                            </Link>
                        </div>
                    </div>
                    <Modal
                        title="Mã hóa RSA"
                        centered
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1000}
                        footer={[
                            <Button onClick={() => postGenerateKey(dataE)} key="back" type="primary submit" shape="round" icon={<UploadOutlined />} size="large" >Tạo Khóa</Button>,
                            <Button onClick={() => postMessage(message)} key="back" type="primary submit" shape="round" icon={<UploadOutlined />} size="large" >Gửi Tin Nhắn</Button>,
                            <Button onClick={() => postMessageE(messageE)} key="back" type="primary submit" shape="round" icon={<UploadOutlined />} size="large" >Mã Hóa Tin Nhắn</Button>,
                        ]}
                    >
                        <form className="blog__container-aside-wrapper-upload">
                            <ul class="list-group RSA__resutl-list">
                                <li class="list-group-item RSA__resutl-list-item">Các dữ kiện</li>
                                <li class="RSA__resutl-list-item list-group-item list-group-item-primary">p: {dataE.p}</li>
                                <li class="RSA__resutl-list-item list-group-item list-group-item-info">q: {dataE.q}</li>
                                <li class="RSA__resutl-list-item list-group-item list-group-item-success">e: {dataE.e}</li>
                                <li class="RSA__resutl-list-item list-group-item list-group-item-danger">n: {dataRecieved?.n}</li>
                                <li class="RSA__resutl-list-item list-group-item list-group-item-warning">d:{dataRecieved?.d}</li>
                                <li class="RSA__resutl-list-item list-group-item list-group-item-warning">MessageE:{messageE?.message}</li>
                            </ul>
                            <Row className="RSA__row">

                                <Col span={12}>
                                    <div className="blog__container-aside-wrapper-upload-content">
                                        <div className="blog__container-aside-wrapper-upload-content-box RSA__col">
                                            <h3 className="blog__container-aside-wrapper-upload-content-box-title RSA__widthFull">Nhập p :</h3>
                                            <textarea rows="1" className="blog__container-aside-wrapper-upload-content-box-content"
                                                onChange={handleChangeEncrypt} name="p" value={dataE.p} type="text" placeholder="p là 1 số nguyên tố ... "
                                                autocomplete="off">
                                            </textarea>

                                        </div>
                                        <div className="blog__container-aside-wrapper-upload-content-box RSA__col">
                                            <h3 className="blog__container-aside-wrapper-upload-content-box-title RSA__widthFull">Nhập q : </h3>
                                            <textarea rows="1" className="blog__container-aside-wrapper-upload-content-box-content"
                                                onChange={handleChangeEncrypt} name="q" value={dataE.q} type="text" placeholder="q là 1 số nguyên tố ... "
                                                autocomplete="off">
                                            </textarea>
                                        </div>
                                        <div className="blog__container-aside-wrapper-upload-content-box RSA__col">
                                            <h3 className="blog__container-aside-wrapper-upload-content-box-title RSA__widthFull">Nhập e : </h3>
                                            <textarea rows="1" className="blog__container-aside-wrapper-upload-content-box-content"
                                                onChange={handleChangeEncrypt} name="e" value={dataE.e} type="text" placeholder="1 < e < lambda N ... "
                                                autocomplete="off">
                                            </textarea>
                                        </div>
                                        <div className="blog__container-aside-wrapper-upload-content-box RSA__col">
                                            <h3 className="blog__container-aside-wrapper-upload-content-box-title RSA__widthFull">Nhập Message :</h3>
                                            <textarea rows="3" className="blog__container-aside-wrapper-upload-content-box-content"
                                                name="message"
                                                onChange={handleChangeMessage}
                                                placeholder="Nhập nội dung cần gửi "
                                                value={message.message}
                                                autocomplete="off">
                                            </textarea>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="blog__container-aside-wrapper-upload-content">
                                        <div className="blog__container-aside-wrapper-upload-content-box RSA__col">
                                            <h3 className="blog__container-aside-wrapper-upload-content-box-title RSA__widthFull">Message Mã Hóa:</h3>
                                            <textarea rows="4" className="blog__container-aside-wrapper-upload-content-box-content"
                                                name="message"
                                                onChange={handleChangeMessageEncrypt}
                                                placeholder="Nhập nội dung cần gửi"
                                                value={messageE?.message}
                                                autocomplete="off">
                                            </textarea>
                                        </div>
                                        <div className="blog__container-aside-wrapper-upload-content-box RSA__col">
                                            <h3 className="blog__container-aside-wrapper-upload-content-box-title RSA__widthFull">Nhập d : </h3>
                                            <textarea rows="1" className="blog__container-aside-wrapper-upload-content-box-content"
                                                onChange={handleChangeMessageEncrypt}
                                                autocomplete="off"
                                                name="d"
                                                value={messageE?.d}
                                                type="text" placeholder="1 < d < lambda N ... "
                                            >
                                            </textarea>
                                        </div>
                                        <div className="blog__container-aside-wrapper-upload-content-box RSA__col">
                                            <h3 className="blog__container-aside-wrapper-upload-content-box-title RSA__widthFull">Message Đã Giải Mã : </h3>
                                            <textarea rows="3" className="blog__container-aside-wrapper-upload-content-box-content"
                                                placeholder="Message đã giải mã"
                                                value={messageD?.message}
                                                autocomplete="off">
                                            </textarea>
                                        </div>
                                    </div>
                                </Col>

                            </Row>

                        </form>

                    </Modal>

                </div>
            </Col>
        </div >

    )
}
