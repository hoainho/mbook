import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import requestAPI from '../../../api';
import notificationCustom from '../../../notification/index';
import Notification from 'react-notify-toast'
import { Checkbox } from 'antd';
import Spinner from 'react-bootstrap/Spinner'
export default function DashboardProductCreate(props) {

    const createForm = useRef();
    const cateInput = useRef();
    const [isCheckedSmall, setIsCheckedSmall] = useState(false);
    const [isCheckedMedium, setIsCheckedMedium] = useState(false);
    const [isCheckedLarge, setIsCheckedLarge] = useState(false);
    const [inputValue, setInputValue] = useState(
        {
            name: '',
            quantity: '',
            description: '',
            thumbnails: '',
            imageBef: '',
            imageAf: '',
            rating: 5,
            hot: false,
            sale: false,
            priceOld: '',
            priceSale: '',
            authorName: '',
            createddate: ''
        }
    )
    const [cate, setCate] = useState([])
    const [author, setAuthor] = useState([])
    const [cateValue, setCateValue] = useState("")
    const [authorValue, setAuthorValue] = useState("")
    const [size, setSize] = useState([])
    const [file, setFile] = useState([])
    const [productImgBefore, setProductImgBefore] = useState({})
    const [productImgAfter, setProductImgAfter] = useState({})

    const checkedSize = (event) => {
        if (event.target.id === "1") {
            if (isCheckedSmall) {
                setIsCheckedSmall(false)
            } else {
                setSize(size => [...size, 'Small'])
                setIsCheckedSmall(true)
            }
        }
        if (event.target.id === "2") {
            if (isCheckedMedium) {
                setIsCheckedMedium(false)
            } else {
                setSize(size => [...size, 'Medium'])
                setIsCheckedMedium(true)
            }
        }
        if (event.target.id === "3") {
            if (isCheckedLarge) {
                setIsCheckedLarge(false)
            } else {
                setSize(size => [...size, 'Large'])
                setIsCheckedLarge(true)
            }
        }
    }

    const handleOnChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }

    useEffect(() => {
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
        requestAPI('/author', 'GET')
            .then(res => {
                if (res) {
                    setAuthor(res.data)
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
        inputValue.createddate = new Date();
        console.log({ inputValue });
        if (inputValue.priceSale !== "") {
            inputValue.sale = true
        } else {
            inputValue.sale = false
        }
        requestAPI('/product', 'POST', inputValue, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    notificationCustom("Thông Báo", `Thêm Sản Phẩm thành công  `, "success")
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
                    setCateValue(inputValue.cate)
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

    const deleteImgBefore = (event) => {
        // const virutalFile = [...productImg]
        // virutalFile.splice(event.target.id, 1)
        // setFile(virutalFile)
        setInputValue({ ...inputValue, imageBef: '' })
    }
    const deleteImgAfter = (event) => {
        setInputValue({ ...inputValue, imageAf: '' })

    }
    const selectImage = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const data = new FormData()
            data.append('file', files[i])
            data.append('upload_preset', 'mbookImage')
            axios.post('https://api.cloudinary.com/v1_1/remalw/upload', data)
                .then(res => {
                    console.log({ url: res.data.url });
                    setFile({ ...file, url: res.data.url })
                    setProductImgBefore({ urlImage: res.data.url })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        // const fileArr = Array.prototype.slice.call(files)
        // console.log({ fileArr });
        // fileArr.forEach(item => {
        //     setFile(file => [...file, item])
        // })

    }
    const handleChangeImage = async (e) => {
        const files = e.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'mbookImage')
        axios.post('https://api.cloudinary.com/v1_1/remalw/upload', data)
            .then(res => {
                console.log({ url: res.data.url });
                setInputValue({ ...inputValue, imageBef: res.data.url })
            })
            .catch(err => {
                console.log(err);
            })

    };
    const handleChangeImageAfter = async (e) => {
        const files = e.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'mbookImage')
        axios.post('https://api.cloudinary.com/v1_1/remalw/upload', data)
            .then(res => {
                console.log({ url: res.data.url });
                setInputValue({ ...inputValue, imageAf: res.data.url })
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
            <Notification />

            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Thông Tin Sách
                    </div>
                    <div
                        className="create-box-title-close flex-center-dashboard"
                        onClick={() => {
                            props.setCloseCreateFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tên : </div>
                        <div className="dashboard-right">
                            <input type="text" name="name" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Hình Ảnh Mặt Trước : </div>
                        <div className="dashboard-right">
                            <input
                                onChange={handleChangeImage}
                                type="file"
                                accept="image/*"
                                name="imageBef"
                                className="noborder"
                                multiple="multiple"
                                style={{ height: '50px' }}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap: 'wrap' }}>
                                {inputValue.imageBef ?
                                    <div className="create-box-img">
                                        <img src={inputValue.imageBef} alt="Products-image" />
                                        <div className="create-box-img-overlay">
                                            <p onClick={deleteImgBefore} className="icon">X</p>
                                        </div>
                                    </div>
                                    : <Spinner animation="grow" size="sm" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Hình Ảnh Mặt Sau : </div>
                        <div className="dashboard-right">
                            <input
                                onChange={handleChangeImageAfter}
                                type="file"
                                accept="image/*"
                                name="imageAf"
                                className="noborder"
                                multiple="multiple"
                                style={{ height: '50px' }}
                            ></input>
                            <div className="flex" style={{ overflowY: 'hidden', flexWrap: 'wrap' }}>
                                {inputValue.imageAf ?
                                    <div className="create-box-img">
                                        <img src={inputValue.imageAf} alt="Products-image" />
                                        <div className="create-box-img-overlay">
                                            <p onClick={deleteImgAfter} className="icon">X</p>
                                        </div>
                                    </div>
                                    : <Spinner animation="grow" size="sm" />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tác Giả :  </div>
                        <div className="dashboard-right">
                            <select style={{ width: "30%", marginRight: "5%" }}
                                onChange={(event) => { setInputValue({ ...inputValue, authorName: event.target.value }) }}
                                value={inputValue?.authorName}>
                                <option></option>
                                {author.length > 0 &&
                                    author.map(item => {
                                        return (
                                            <option key={item?.id}>{item?.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <Checkbox onChange={(event) => { setInputValue({ ...inputValue, hot: event.target.checked }) }}>HOT</Checkbox>
                        </div>
                    </div>

                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Giá Mặc Định :  </div>
                        <div className="dashboard-right">
                            <input type="number" name="priceOld" placeholder="VNĐ" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Giá Sale : </div>
                        <div className="dashboard-right">
                            <input type="number" name="priceSale" placeholder="VNĐ" onChange={handleOnChange} ></input>
                        </div>

                    </div>

                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Thể Loại </div>
                        <div className="dashboard-right flex-center-dashboard">
                            <select style={{ width: "350px" }}
                                onChange={(event) => { setInputValue({ ...inputValue, category: event.target.value }) }}
                                value={inputValue.category}>
                                <option></option>
                                {cate.length > 0 &&
                                    cate.map(item => {
                                        return (
                                            <option key={item?.id}>{item?.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="text" name="cate" placeholder="New category?" style={{ margin: '0 10px' }} onChange={handleOnChange} ref={cateInput}></input>
                            <div className="btn" style={{
                                fontSize: '14px',
                                fontFamily: 'sans-serif',
                                fontWeight: '300',
                                padding: '0 10px',
                                cursor: 'pointer',
                                width: '350px',
                                height: '30px'
                            }}
                                onClick={addNewCate}>
                                Add
                            </div>
                        </div>
                    </div>

                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Số Lượng : </div>
                        <div className="dashboard-right">
                            <input type="number" name="quantity" placeholder="Số Lượng sách trong kho ..." onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Mô tả ngắn :  </div>
                        <div className="dashboard-right">
                            <input type="text" name="thumbnails" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Mô tả :  </div>
                        <div className="dashboard-right">
                            <textarea rows="6" type="text" name="description" style={{ width: '100%' }} onChange={handleOnChange} autoComplete="off" required></textarea>
                        </div>
                    </div>

                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn">
                            Thêm Sản Phẩm
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}