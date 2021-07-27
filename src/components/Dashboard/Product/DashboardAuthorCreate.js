
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import requestAPI from '../../../api';
import notificationCustom from '../../../notification/index';
import Spinner from 'react-bootstrap/Spinner'
export default function DashboardAuthorCreate(props) {

    const [inputValue, setInputValue] = useState({
        name: '',
        age: '',
        description: '',
        image: '',
        slogan: '',
        productList: []
    })


    const handleOnChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }

    useEffect(() => {

    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        inputValue.createddate = new Date();
        requestAPI('/author', 'POST', inputValue, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                console.log(res.data);
                if (res.data === "Tác Giả Đã Tồn Tại") {
                    notificationCustom("Thông Báo", res.data, "success")

                } else {
                    notificationCustom("Thông Báo", res.data, "success")
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        notificationCustom("Nhắc Nhở", `Bạn không đủ quyền `, "warning")
                    }
                    if (err.response.status === 500) {
                        notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                    }
                }
            })
    }



    const deleteImg = (event) => {
        setInputValue({ ...inputValue, image: '' })
    }

    const handleChangeImage = async (e) => {
        const files = e.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'mbookImage')
        axios.post('https://api.cloudinary.com/v1_1/remalw/upload', data)
            .then(res => {
                setInputValue({ ...inputValue, image: res.data.url })
            })
            .catch(err => {
                console.log(err);
            })

    };
    const [hideText, setHideText] = useState(false)
    const openMenu = props.openMenu;
    useEffect(() => {
        if (openMenu === false) setHideText(true)
        if (openMenu === true) setHideText(false)
    }, [setHideText, openMenu])
    return (
        <div className="DashboardProductInfo" style={hideText === false ? { width: '85%' } : { width: '100%' }}>
            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Thông Tin Tác Giả
                    </div>
                    <div
                        className="create-box-title-close flex-center-dashboard"
                        onClick={() => {
                            props.setCloseCreateAuthorFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tên : </div>
                        <div className="dashboard-right">
                            <input type="text" name="name" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Hình Ảnh : </div>
                        <div className="dashboard-right">
                            <input
                                // onChange={selectImage}
                                onChange={handleChangeImage}
                                type="file"
                                accept="image/*"
                                name="productImg"
                                className="noborder"
                                multiple="multiple"
                                style={{ height: '50px' }}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap: 'wrap' }}>
                                {inputValue.image ?
                                    <div className="create-box-img">
                                        <img src={inputValue.image} alt="Products-image" />
                                        <div className="create-box-img-overlay">
                                            <p onClick={deleteImg} className="icon">X</p>
                                        </div>
                                    </div>
                                    : <Spinner animation="grow" size="sm" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tuổi : </div>
                        <div className="dashboard-right">
                            <input type="number" name="age" placeholder="Năm mất(nếu mất) trừ năm sinh " onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Khẩu Hiệu ( Nếu Có ) :  </div>
                        <div className="dashboard-right">
                            <input type="text" name="slogan" onChange={handleOnChange}></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Mô tả :  </div>
                        <div className="dashboard-right">
                            <textarea rows="6" type="text" name="description" style={{ width: '100%' }} onChange={handleOnChange} autoComplete="off" required></textarea>
                        </div>
                    </div>

                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <button type="submit" className="create-box-btn btn">
                            Thêm Tác Giả
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
