import React from 'react'

export default function ReviewsUploadImage(props) {
    const Col = props.Col
    const ImgCrop = props.ImgCrop
    const Upload = props.Upload
    const fileList = props.fileList
    const handleChangeImage = props.handleChangeImage
    const onPreview = props.onPreview
    return (
        <Col span={8}>
            <div className="blog__container-aside-wrapper-upload-image">
                <ImgCrop rotate>
                    <Upload
                        action="https://5f1446062710570016b37d7d.mockapi.io/Product"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChangeImage}
                        onPreview={onPreview}
                    >
                        {fileList.length < 1 && '+ Upload'}
                    </Upload>
                </ImgCrop>
            </div>
        </Col>

    )
}
