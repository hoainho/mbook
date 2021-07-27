import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import requestAPI from '../../../api/index'
import DashboardEditor from './DashboardEditor';
import { useSelector } from 'react-redux';
import notificationCustom from '../../../notification/index';
import axios from 'axios'

export default function DashboardNewsCreate(props) {
    const [cate, setCate] = useState([])

    const cateInput = useRef();
    const [inputValue, setInputValue] = useState({
        categoryId: [],
        description: "",
        idPoster: "",
        listlike: [],
        createdby: null,
        createddate: null,
        modifiedby: null,
        modifieddate: null,
        sub: "",
        title: "",
        urlImage: ""
    })
    const handleOnChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }
    const poster = useSelector((state) => state.poster)
    const { categoryId, description, idPoster, listlike, modifiedby, modifieddate, createdby, createddate, sub, title, urlImage } = poster.posterEdit.product
    useEffect(() => {
        setInputValue({
            categoryId,
            description,
            idPoster,
            listlike,
            modifiedby,
            modifieddate,
            createdby,
            createddate,
            sub,
            title,
            urlImage
        })
        requestAPI('/category', 'GET')
            .then(res => {
                if (res) {
                    setCate(res.data)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log('ERROR :' + err);
                }
            })

    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        console.log({ inputValue });
        inputValue.modifieddate = new Date();
        requestAPI(`/poster/${idPoster}`, 'PUT', inputValue, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res.data) {
                    notificationCustom("Thông Báo", `${res.data}`, "success")
                    props.setToastFunc(true)
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

    const addNewCate = () => {
        requestAPI('/category', 'POST', { name: inputValue.cate }, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    notificationCustom("Thông Báo", `Thêm Thể Loại thành công  `, "success")
                    console.log(res.data);
                    setCate(cate => [...cate, { name: inputValue.cate }])
                    cateInput.current.value = ""
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        notificationCustom("Nhắc Nhở", `Bạn không đủ quyền `, "warning")
                        console.log("Bạn không đủ quyền");
                    }
                    if (err.response.status === 400) {
                        notificationCustom("Nhắc Nhở", `Thể Loại Đã Tồn Tại `, "warning")
                        console.log("Thể Loại Đã Tồn Tại");
                    }
                    if (err.response.status === 500) {
                        notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                        console.log("Vui lòng nhập thông tin theo đúng yêu cầu");
                    }
                }
            })
    }
    const handleChangeImage = async (e) => {
        const files = e.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'mbookImage')
        axios.post('https://api.cloudinary.com/v1_1/remalw/upload', data)
            .then(res => {
                console.log({ url: res.data.url });
                setInputValue({ ...inputValue, urlImage: res.data.url })
            })
            .catch(err => {
                console.log(err);
            })

    };
    const deleteImg = () => {
        setInputValue({ ...inputValue, urlImage: '' })
    }
    const handleChangeContent = (description) => {
        setInputValue({ ...inputValue, description })
    }
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
                        Thông Tin Bài Viết
                    </div>
                    <div
                        className="create-box-title-close flex-center-dashboard"
                        onClick={() => {
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} >
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Title</div>
                        <div className="dashboard-right">
                            <input
                                type="text" name="title"
                                value={inputValue?.title || ""}
                                onChange={handleOnChange} required
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Sub</div>
                        <div className="dashboard-right">
                            <input
                                type="text" name="sub"
                                value={inputValue?.sub || ""}
                                onChange={handleOnChange} required
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Images </div>
                        <div className="dashboard-right">
                            <input
                                onChange={handleChangeImage}
                                type="file"
                                accept="image/*"
                                name="urlImage"
                                className="noborder"
                                multiple="multiple"
                                style={{ height: '50px' }}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap: 'wrap' }}>
                                {inputValue.urlImage ?
                                    <div className="create-box-img">
                                        <img src={inputValue.urlImage} alt="Products-image" />
                                        <div className="create-box-img-overlay">
                                            <p onClick={deleteImg} className="icon">X</p>
                                        </div>
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                    <div style={{ border: '1px #ddd solid' }}>
                        <DashboardEditor
                            newsContent={inputValue?.description}
                            setNewsContent={handleChangeContent}
                        />
                    </div>
                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn">
                            Edit Poster
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}