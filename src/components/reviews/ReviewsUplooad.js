import React from 'react'
import ReviewsUploadImage from './ReviewsUploadImage'
import ReviewsUploadText from './ReviewsUploadText'

export default function ReviewsUplooad(props) {

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
    const Row = props.Row
    const Col = props.Col
    const ImgCrop = props.ImgCrop
    const Upload = props.Upload
    const Pagination = props.Pagination
    const Select = props.Select
    return (
        <form className="blog__container-aside-wrapper-upload">
            <Row>
                {/* Text */}

                <ReviewsUploadText
                    Col={Col}
                    handleChangeTitle={handleChangeTitle}
                    txtTitle={txtTitle}
                    Select={Select}
                    handleChangeCategory={handleChangeCategory}
                    category={category}
                    handleChangeSub={handleChangeSub}
                    txtSub={txtSub}
                    handleChangeContent={handleChangeContent}
                    txtContent={txtContent}
                />
                {/* Image */}

                <ReviewsUploadImage
                    Col={Col}
                    ImgCrop={ImgCrop}
                    Upload={Upload}
                    fileList={fileList}
                    handleChangeImage={handleChangeImage}
                    onPreview={onPreview}
                    fileList={fileList}
                />
            </Row>


        </form>

    )
}
