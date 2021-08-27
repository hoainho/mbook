import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Modal, notification, Carousel } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { SmileOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import requestAPI from '../../api/index'
import { useLocation } from "react-router-dom";
import { findByAuthor } from '../../features/product/productSlice';
import BookItem from '../store/BodyStoreItem';
// import {findB}
export default function Author() {
    const { pathname } = useLocation();
    const idAuthor = pathname.slice(8, pathname.length);
    const [details, setDetails] = useState()
    const products = useSelector(state => state.product)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(findByAuthor(idAuthor))
        requestAPI(`/author/${idAuthor}`, 'GET')
            .then(res => {
                setDetails(res.data)
                console.log({ data: res.data });

            })
            .catch(err => {
                console.log("Faild from server : ", err);
            })
    }, [])
    const [visible, setVisible] = useState(false);
    const openNotification = () => {
        notification.open({
            message: 'Thông Báo',
            description:
                'Chức năng đang được phát triển',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
    };
    return (
        <div className="container-wrapper">
            <div className="author">
                <div className="author__title">
                    <h1 className="author__title-content">Tác Giả</h1>
                </div>
                <Row gutter={[8, 1]} className="author__row">
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 16 }}>
                        <div className="author__content">
                            <div className="author__content-slogan">
                                <h3 className="author__content-slogan-text">
                                    {`" ${details?.slogan} "`}
                                </h3>
                            </div>
                            <div className="author__content-wrapper">
                                <Carousel >
                                    <div className="author__content-wrapper--custom">
                                        <div className="author__content-wrapper-items">
                                            {products.productByAuthor?.map(item => {
                                                return (
                                                    <BookItem key={item.id} book={item} gridTab={1} />
                                                )
                                            })}
                                        </div>
                                    </div>

                                </Carousel>

                            </div>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
                        <div className="author__image">
                            <div className="author__image-img">
                                <img className="author__image-img-item" src={details?.image} alt="imgBook" />
                                <span className="author__image-img-icon" onClick={() => setVisible(true)}>
                                    <i class="fa fa-expand" aria-hidden="true"></i>
                                </span>
                            </div>
                            <Modal
                                title="THÔNG TIN TÁC GIẢ"
                                centered
                                visible={visible}
                                onCancel={() => setVisible(false)}
                                footer={[
                                    <Button onClick={openNotification} key="back" type="primary" shape="circle" icon={<DownloadOutlined />} size="large" />
                                ]}
                                width={650}
                            >
                                <div className="details__content-lookInside">
                                    <div className="author__image-content-wrapper">
                                        <h5 className="author__image-content-wrapper-name"> {details?.name} </h5>
                                        <span className="author__image-content-wrapper-birthDate"> {details?.age} Tuổi</span>
                                        <p className="author__image-content-wrapper-description--modal"> {details?.description} </p>
                                    </div>
                                </div>
                            </Modal>
                            <div className="author__image-content">
                                <div className="author__image-content-wrapper">
                                    <h5 className="author__image-content-wrapper-name"> {details?.name} </h5>
                                    <span className="author__image-content-wrapper-birthDate"> {details?.age} Tuổi</span>
                                    <p className="author__image-content-wrapper-description--modal"> {details?.description} </p>

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
