import React from 'react'
import ReviewsRecommend from './ReviewsRecommend'

export default function ReviewsAside(props) {
    const setVisible = props.setVisible
    const visible = props.visible
    const openNotification = props.openNotification
    const handleChangeTitle = props.handleChangeTitle
    const txtTitle = props.txtTitle
    const category = props.category
    const handleChangeSub = props.handleChangeSub
    const txtSub = props.txtSub
    const handleChangeContent = props.handleChangeContent
    const txtContent = props.txtContent
    const fileList = props.fileList
    const handleChangeImage = props.handleChangeImage
    const onPreview = props.onPreview
    const handleChangeCategory = props.handleChangeCategory
    const Link = props.Link
    const Row = props.Row
    const Col = props.Col
    const ButtonCustom = props.ButtonCustom
    const Modal = props.Modal
    const Button = props.Button
    const UploadOutlined = props.UploadOutlined
    const ImgCrop = props.ImgCrop
    const Upload = props.Upload
    const Select = props.Select
    const ReviewsUplooad = props.ReviewsUplooad
    const Pagination = props.Pagination
    return (
        <Col className="blog__container-aside" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <div className="blog__container-aside-wrapper">
                <div onClick={() => setVisible(true)} >
                    <ButtonCustom nameButton="Đánh Giá" icon="cloud-upload" />
                </div>

                <Modal
                    title="Reviews"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={[
                        <Button onClick={openNotification} key="back" type="primary" shape="round" icon={<UploadOutlined />} size="large" >Gửi</Button>,
                    ]}
                >
                    <ReviewsUplooad
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
                        Row={Row}
                        Col={Col}
                        ImgCrop={ImgCrop}
                        Upload={Upload}
                        Pagination={Pagination}
                        Select={Select}
                    />

                </Modal>

            </div>
            <ReviewsRecommend Link={Link} title="Bài viết gần đây" icon="folder-open-o" />
            <ReviewsRecommend Link={Link} title="Bình luận gần đây" icon="comments-o" />
        </Col>

    )
}
