import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import requestAPI from '../../../api';
import notificationCustom from '../../../notification/index';
import Notification from 'react-notify-toast'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd';
import Spinner from 'react-bootstrap/Spinner'
export default function DashboardProductEdit(props) {

    const createForm = useRef();
    const cateInput = useRef();
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
            idAuthor: '',
            idCategory: '',
            CategoryProducts: [],
            modifieddate: '',
        }
    )
    const [cate, setCate] = useState([])
    const [authorNew, setAuthorNew] = useState([])
    const [cateValue, setCateValue] = useState("")
    const product = useSelector((state) => state.product)
    const { idProduct, name, imageBef, imageAf, idAuthorNavigation, priceOld, priceSale, quantity, rating, thumbnails, categoryProducts, hot, description } = product.productEdit.product
    const handleOnChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }
    useEffect(() => {
        let idCategory = categoryProducts[0]?.idCategoryNavigation?.idCategory;
        let idAuthor = idAuthorNavigation?.idAuthor
        setInputValue({
            idProduct,
            name,
            quantity,
            description,
            thumbnails,
            imageBef,
            imageAf,
            rating,
            priceOld,
            hot,
            priceSale,
            idAuthor,
            idCategory,
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
        requestAPI('/author', 'GET')
            .then(res => {
                if (res) {
                    setAuthorNew(res.data)
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
        inputValue.modifieddate = new Date();
        if (inputValue.priceSale > 0 && inputValue.priceSale) {
            inputValue.sale = true
        } else {
            inputValue.sale = false
        }
        //post id
        console.log({ inputValue });
        requestAPI(`/product/${idProduct}`, 'PUT', inputValue, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res.data) {
                    notificationCustom("Thông Báo", `${res.data}`, "success")
                    props.setToastFunc(true)
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403 || err.response.status === 401) {
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
        setInputValue({ ...inputValue, imageBef: '' })
    }
    const deleteImgAfter = (event) => {
        setInputValue({ ...inputValue, imageAf: '' })

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
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Tên : </div>
                        <div className="dashboard-right">
                            <input type="text" name="name" value={inputValue.name} onChange={handleOnChange} required></input>
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
                        <div className="dashboard-right flex-left-dashboard">
                            <select style={{ width: "30%", marginRight: "5%" }}
                                onChange={(event) => { setInputValue({ ...inputValue, idAuthor: event.target.value }) }}
                                value={inputValue?.idAuthor}>
                                <option></option>
                                {authorNew.length > 0 &&
                                    authorNew.map(item => {
                                        return (
                                            <option value={item?.idAuthor} key={item?.idAuthor}>{item?.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <Checkbox defaultChecked={hot} onChange={(event) => { setInputValue({ ...inputValue, hot: event.target.checked }) }}>HOT</Checkbox>
                        </div>
                    </div>

                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Giá Mặc Định :  </div>
                        <div className="dashboard-right">
                            <input type="number" name="priceOld" value={inputValue.priceOld} placeholder="VNĐ" onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Giá Sale : </div>
                        <div className="dashboard-right">
                            <input type="number" name="priceSale" value={inputValue.priceSale} placeholder="VNĐ" onChange={handleOnChange} ></input>
                        </div>

                    </div>

                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Thể Loại </div>
                        <div className="dashboard-right flex-center-dashboard">
                            <select style={{ width: "350px" }}
                                onChange={(event) => { setInputValue({ ...inputValue, idCategory: event.target.value, CategoryProducts: [{ idCategory: event.target.value }] }) }}
                                value={inputValue.idCategory}>
                                <option></option>
                                {cate.length > 0 &&
                                    cate.map(item => {
                                        return (
                                            <option value={item?.idCategory} key={item?.idCategory}>{item?.name}</option>
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
                            <input type="number" name="quantity" value={inputValue.quantity} placeholder="Số Lượng sách trong kho ..." onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Mô tả ngắn :  </div>
                        <div className="dashboard-right">
                            <input type="text" name="thumbnails" value={inputValue.thumbnails} onChange={handleOnChange} required></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Mô tả :  </div>
                        <div className="dashboard-right">
                            <textarea rows="6" type="text" name="description" value={inputValue.description} style={{ width: '100%' }} onChange={handleOnChange} autoComplete="off" required></textarea>
                        </div>
                    </div>

                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn">
                            Cập Nhật Sản Phẩm
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}