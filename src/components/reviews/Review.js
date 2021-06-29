import React, { useState } from 'react'
import { Row, Col, Modal, Pagination, notification, Upload, Select, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { SmileOutlined, PoweroffOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ButtonCustom from '../../features/button';
import ImgCrop from 'antd-img-crop';
import ReviewItems from './ReviewItems'
import Footer from '../footer/Footer'
import ReviewsHeader from './ReviewsHeader';
import ReviewsContainer from './ReviewsContainer';
import ReviewsUplooad from './ReviewsUplooad';
import book1 from './book1.jpg'
import book2 from './book2.jpg'
import book3 from './book3.jpg'
import book4 from './book4.jpg'
export default function Review() {
    const { Option } = Select;
    const categoryData = ['Tình Cảm', 'Triết Lí', 'Tâm Lí', 'Gia Đình', 'Cuộc Sống', 'Viễn Tưởng'];
    const category = [];
    // Render Thể Loại
    categoryData.map((item, index) => {
        category.push(<Option key={index}>{item}</Option>);
    })
    // Get value add 
    function handleChangeCategory(value) {
        console.log(`selected ${value}`);
    }
    const [txtTitle, setTxtTitle] = useState();
    const [txtSub, setTxtSub] = useState();
    const [txtContent, setTxtContent] = useState();
    const [visible, setVisible] = useState(false);
    const [fileList, setFileList] = useState([]);
    function handleChangeTitle(e) {
        setTxtTitle(e.target.value);
    }
    function handleChangeSub(e) {
        setTxtSub(e.target.value);
    }
    function handleChangeContent(e) {
        setTxtContent(e.target.value);
    }
    // Upload Image Post
    const handleChangeImage = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    //Notification
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
            <div className="blog">
                <ReviewsHeader />
                <ReviewsContainer
                    book1={book1}
                    book2={book2}
                    book3={book3}
                    book4={book4}
                    setVisible={setVisible}
                    visible={visible}
                    openNotification={openNotification}
                    handleChangeTitle={handleChangeTitle}
                    txtTitle={txtTitle}
                    category={category}
                    handleChangeSub={handleChangeSub}
                    txtSub={txtSub}
                    handleChangeContent={handleChangeContent}
                    txtContent={txtContent}
                    fileList={fileList}
                    handleChangeImage={handleChangeImage}
                    onPreview={onPreview}
                    handleChangeCategory={handleChangeCategory}
                    Link={Link}
                    Row={Row}
                    Col={Col}
                    ReviewItems={ReviewItems}
                    ButtonCustom={ButtonCustom}
                    Modal={Modal}
                    Button={Button}
                    UploadOutlined={UploadOutlined}
                    ImgCrop={ImgCrop}
                    Upload={Upload}
                    Pagination={Pagination}
                    Select={Select}
                    ReviewsUplooad={ReviewsUplooad}
                />
            </div>
            <Footer />
        </div>

    )
}
