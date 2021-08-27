import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import notificationCustom from '../../../notification/index';
import requestAPI from '../../../api/index'

export default function DashboardUserCreate(props) {

    const createForm = useRef();
    const [hideText, setHideText] = useState(false)
    const openMenu = props.openMenu;
    useEffect(() => {
        if (openMenu === false) setHideText(true)
        if (openMenu === true) setHideText(false)
    }, [setHideText, openMenu])
    const [inputValue, setInputValue] = useState({
        modifiedby: "", modifieddate: "", createdby: "", createddate: "", fullname: "", username: "", password: "", roleid: false, status: false
    })
    const onSubmit = (event) => {
        event.preventDefault()
        inputValue.createddate = new Date();
        console.log({ inputValue });
        requestAPI(`/account/signup`, 'POST', inputValue, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res.data === false) {
                    notificationCustom("Nhắc Nhở", `Bạn không đủ quyền `, "warning")
                }
                if (res.data) {
                    notificationCustom("Thông Báo", `Thêm Tài Khoản Thành Công `, "success")
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
    const handleOnChange = (event) => {
        setInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }
    return (
        <div className="DashboardProductInfo" style={hideText === false ? { width: '85%' } : { width: '100%' }}>
            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        User infomation
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
                <form onSubmit={onSubmit} ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">FullName</div>
                        <div className="dashboard-right">
                            <input
                                type="text" name="fullname"
                                value={inputValue?.fullname}
                                onChange={handleOnChange} required
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">UserName</div>
                        <div className="dashboard-right">
                            <input
                                type="text" name="username"
                                value={inputValue?.username}
                                onChange={handleOnChange}
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Password</div>
                        <div className="dashboard-right">
                            <input
                                type="text"
                                className="input"
                                name="password"
                                value={inputValue?.password}
                                onChange={handleOnChange}
                            ></input>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Role</div>
                        <div className="dashboard-right">
                            <select
                                className="input"
                                value={inputValue?.roleid}
                                onChange={(event) => { setInputValue({ ...inputValue, roleid: event.target.value }) }} required
                            >
                                <option></option>
                                <option value={true}>Admin</option>
                                <option value={false}>User</option>
                            </select>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Status</div>
                        <div className="dashboard-right">
                            <select
                                className="input"
                                value={inputValue?.status}
                                onChange={(event) => { setInputValue({ ...inputValue, status: event.target.value }) }} required
                            >
                                <option></option>
                                <option value={false}>Vô Hiệu Hóa</option>
                                <option value={true}>Kích Hoạt</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn" type='submit'>
                            Create user
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}