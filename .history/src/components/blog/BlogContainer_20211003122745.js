import React, { useState, useEffect } from 'react'
import { Col, Pagination } from 'antd'
import BlogList from './BlogList'
import requestAPI from '../../api';

export default function BlogContainer(props) {
    const [postAPI, setPostAPI] = useState([])
    const { posterList } = props
    useEffect(() => {
        requestAPI('/poster/get', 'GET')
            .then(res => {
                if (res) {
                    console.log({ status: res.status });
                    setPostAPI(res.data)
                }
            })
            .catch(err => {
                console.log("Get data poster list be faild, error's : ", err);
            })
    }, [posterList])
    return (
        <Col className="blog__container-main" xs={{ span: 12 }} md={{ span: 16 }} lg={{ span: 18 }}>

            <BlogList posters={postAPI} />
            {/* Phân Trang */}
            <Pagination className="blog__container-main-pagination" size="small" total={500} showQuickJumper />
        </Col>
    )
}
