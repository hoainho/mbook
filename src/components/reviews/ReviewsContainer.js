import React from 'react'
import ReviewsAside from './ReviewsAside'
import ReviewsMain from './ReviewsMain'
export default function ReviewsContainer(props) {
    const book1 = props.book1
    const book2 = props.book2
    const book3 = props.book3
    const book4 = props.book4
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
    const ReviewItems = props.ReviewItems
    const ButtonCustom = props.ButtonCustom
    const Modal = props.Modal
    const Button = props.Button
    const UploadOutlined = props.UploadOutlined
    const ImgCrop = props.ImgCrop
    const Upload = props.Upload
    const Pagination = props.Pagination
    const ReviewsUplooad = props.ReviewsUplooad
    const Select = props.Select
    return (
        <Row gutter={[16, 16]} className="blog__container">
            <ReviewsMain
                Col={Col}
                Row={Row}
                Pagination={Pagination}
                ReviewItems={ReviewItems}
                book1={book1}
                book2={book2}
                book3={book3}
                book4={book4} />
            <ReviewsAside
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
        </Row>

    )
}
