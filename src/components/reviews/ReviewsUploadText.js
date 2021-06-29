import React from 'react'

export default function ReviewsUploadText(props) {
    const Col = props.Col
    const handleChangeTitle = props.handleChangeTitle
    const txtTitle = props.txtTitle
    const Select = props.Select
    const handleChangeCategory = props.handleChangeCategory
    const category = props.category
    const handleChangeSub = props.handleChangeSub
    const txtSub = props.txtSub
    const handleChangeContent = props.handleChangeContent
    const txtContent = props.txtContent
    return (
        <Col span={16}>
            <div className="blog__container-aside-wrapper-upload-content">
                <div className="blog__container-aside-wrapper-upload-content-box">
                    <h3 className="blog__container-aside-wrapper-upload-content-box-title">Tiêu Đề</h3>
                    <input className="blog__container-aside-wrapper-upload-content-box-txt" onChange={handleChangeTitle} value={txtTitle} type="text" placeholder="Nhập tiêu đề bài viết ... " />
                    <span class="focus-border">
                        <i></i>
                    </span>

                </div>

                <div className="blog__container-aside-wrapper-upload-content-box">
                    <h3 className="blog__container-aside-wrapper-upload-content-box-title">Thể Loại</h3>
                    <Select mode="tags" style={{ width: '100%' }} placeholder="Chọn Thể Loại" onChange={handleChangeCategory}>
                        {category}
                    </Select>
                </div>
                <div className="blog__container-aside-wrapper-upload-content-box">
                    <h3 className="blog__container-aside-wrapper-upload-content-box-title">Phụ Đề</h3>
                    <input className="blog__container-aside-wrapper-upload-content-box-sub" onChange={handleChangeSub} value={txtSub} type="text" placeholder="Nhập phụ đề bài viết ... " />
                    <span class="focus-border">
                        <i></i>
                    </span>
                </div>
                <div className="blog__container-aside-wrapper-upload-content-box">
                    <h3 className="blog__container-aside-wrapper-upload-content-box-title">Nội Dung</h3>
                    <textarea rows="6" className="blog__container-aside-wrapper-upload-content-box-content"
                        onChange={handleChangeContent}
                        placeholder="Nhập nội dung bài viết ... "
                        value={txtContent}
                        required autocomplete="off">

                    </textarea>
                </div>
            </div>
        </Col>

    )
}
