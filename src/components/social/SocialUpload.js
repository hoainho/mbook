import React, { useState } from 'react'
import avatar from './avatar.jpg'
import classnames from 'classname';
import { Upload } from 'antd';
export default function SocialUpload() {
    const [rows, setRows] = useState(1)
    const [fileList, setFileList] = useState([]);

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
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        setFileList(true);
    }
    return (
        <div className="social__upload">
            <div className="social__upload-avatar">
                <img className="social__upload-avatar-pic" src={avatar} alt="avatar" />
            </div>
            <div className="social__upload-content">
                <textarea onClick={() => setRows(6)} rows={rows} className="social__upload-content-input" placeholder="Nhớ ơi ,Bạn đang nghĩ gì vậy ?..." required="" data-expandable autocomplete="off"></textarea>

                <div className={classnames("social__upload-content-control", { "actived-flex": rows === 6 })}>
                    <div className="social__upload-content-control-subTitle">
                        <h3 className="social__upload-content-control-subTitle-text">
                            Thêm vào bài viết
                        </h3>
                    </div>
                    <div className="social__upload-content-control-icon" >

                        <Upload
                            action="https://5f1446062710570016b37d7d.mockapi.io/Product"
                            fileList={fileList}
                            onChange={handleChangeImage}
                            onPreview={onPreview}
                        >

                            <span><i class="fa fa-picture-o" aria-hidden="true"></i></span>
                        </Upload>
                        <span><i class="fa fa-link" aria-hidden="true"></i></span>
                        <span> <i class="fa fa-map-marker" aria-hidden="true"></i></span>
                    </div>
                </div>
                <div className={classnames("social__upload-content-func", { "actived-flex": rows === 6 })}>
                    <button onClick={() => setRows(1)} className="social__upload-content-func-cancle">Hủy</button>
                    <button className="social__upload-content-func-upload">Đăng</button>
                </div>
            </div>
        </div>
    )
}
