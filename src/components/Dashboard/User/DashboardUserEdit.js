import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import notificationCustom from '../../../notification/index';
import requestAPI from '../../../api/index'

export default function DashboardUserCreate(props) {
    const createForm = useRef();
    const handleOnChange = (event) => {
        console.log({ [event.target.name]: event.target.value });
        setInputValue({ ...inputValue, [event.target.name]: event.target.value })
    }
    const [inputValue, setInputValue] = useState({
        id: "", modifiedby: "", modifieddate: "", createdby: "", createddate: "", fullname: "", username: "", password: "", roleid: "", status: false
    })
    const account = useSelector((state) => state.account)
    const { idAccount, modifiedby, modifieddate, createdby, createddate, fullname, username, password, roleid, status } = account.accountEdit.account
    useEffect(() => {
        setInputValue({ idAccount, modifiedby, modifieddate, createdby, createddate, fullname, username, password, roleid, status })
    }, [])
    const [hideText, setHideText] = useState(false)
    const openMenu = props.openMenu;
    useEffect(() => {
        if (openMenu === false) setHideText(true)
        if (openMenu === true) setHideText(false)
    }, [setHideText, openMenu])
    const onSubmit = (event) => {
        event.preventDefault()
        inputValue.modifieddate = new Date();
        inputValue.status = JSON.parse(inputValue.status);
        console.log({ inputValue });
        requestAPI(`/account/PutAccount/${idAccount}`, 'PUT', inputValue, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                console.log({ res: res.data });
                notificationCustom("Thông Báo", `Cập Nhật Tài Khoản Thành Công `, "success")
                props.setToastFunc(true)
            })
            .catch(err => {
                if (err.response) {
                    console.log({ err: err.response });

                    if (err.response.status === 403) {
                        notificationCustom("Nhắc Nhở", `Chứng thực tài khoản đã hết hạn, vui lòng đăng nhập lại để thực hiện các chức năng`, "warning")
                    }
                    if (err.response.status === 500) {
                        notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                    }
                }
            })
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
                            props.setCloseEditFunc(false);
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
                                onChange={handleOnChange} disabled
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
                                <option value={true}>Vô Hiệu Hóa</option>
                                <option value={false}>Kích Hoạt</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn" type='submit'>
                            Edit user
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}