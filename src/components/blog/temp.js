import React, { useState } from 'react'
import { notify } from 'react-notify-toast';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
export default function CreateRaoVat({ block }) {
    let style = {}
    block ? style = {
        display: "block"
    } : style = { display: "none" }

    const [redirect, setRedirect] = useState(false)
    const [image, setImage] = useState('')
    const [data, setData] = useState({
        auther: '',
        price: '',
        title: '',
        place: 'TP.HCM'
    })

    const onHandleChange = (e) => {
        let name = e.target.name
        let value
        name === 'price' ? value = parseInt(e.target.value) : value = e.target.value
        setData({ ...data, [name]: value })
    }

    const onHandleChangeImage = async (e) => {
        const files = e.target.files[0]
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'thomas_booklab')
        axios.post('https://api.cloudinary.com/v1_1/thomasediss/image/upload', data)
            .then(res => {
                console.log({ url: res.data.secure_url });
                setImage(res.data.secure_url)
            }
            )
            .catch(err => console.log(err))
    }

    const onHandleSubmit = (e) => {
        e.preventDefault()
        let newData = { ...data, image: image }
        console.log(newData)
        if (data.auther && data.price && data.title && image) {
            axios.post("https://api-book-lab.herokuapp.com/raovats/add", newData)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
            notify.show('Đăng bài viết thành công ! Please reset', 'success', 1500);
            setData({
                auther: '',
                price: '',
                title: '',
                place: ''
            })
            setRedirect(true)
        }
        notify.show('Đăng bài viết không thành công ! Đợi 5s Post lại ^^', 'error', 1500);

    }
    if (redirect) {
        return <Redirect to="/raovats" />
    }

    return (
        <div className="create-raovat" style={style}>
            <h1 className="text-center">Đăng bài viết</h1>
            <form className="create-raovat__form" onSubmit={onHandleSubmit}>
                <label htmlFor="content">Tên sản phẩm:</label>
                <input type="text" name="title" placeholder="Nhập tên sản phẩm ..." value={data.title}
                    onChange={onHandleChange} />
                <label htmlFor="auther">Giá:</label>
                <input type="number" name="price" placeholder="Nhập tên của bạn ..." value={data.price} onChange={onHandleChange} />
                <label htmlFor="content">Tên người bán:</label>
                <input type="text" name="auther" placeholder="Nhập tên ..." value={data.auther} onChange={onHandleChange} />
                <label htmlFor="place">Địa điểm</label>
                <select name="place" value={data.place} onChange={onHandleChange}>
                    <option value="TP.HCM">TP.HCM</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
                <label htmlFor="myfile" placeholder="Nhập nội dung...">Chọn ảnh minh họa:</label>
                <input type="file" name="image" multiple onChange={onHandleChangeImage} /> <br />


                <button type="submit" defaultValue="Submit" className="create-review__form-submit">Đăng bài viết</button>
            </form>
        </div>
    )
}