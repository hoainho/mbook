import React, { useEffect, useState } from 'react'
import './App.css'
import './Dashboard.css'
import DashboardBody from './DashboardBody'
import DashboardMenu from './DashboardMenu'
import { faEnvelope, faFileInvoice, faHome, faInbox, faNewspaper, faShoppingBag, faTshirt, faUser } from '@fortawesome/free-solid-svg-icons'
import socketIOClient from "socket.io-client"
import { withRouter } from 'react-router-dom'
import Notification from 'react-notify-toast'
import ReactNotification from 'react-notifications-component'
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../../features/product/productSlice'
import { updatePoster } from '../../features/poster/posterSlice'
import { updateAccount } from '../../features/account/accountSlice'
import { Link } from 'react-router-dom'
import notificationCustom from '../../notification';
import requestAPI from '../../api';
const ENDPOINT = "http://localhost:3000";

function Dashboard(props) {
    useEffect(() => {
        if (localStorage.getItem('TOKEN')) {
            requestAPI('/account/checkJWT', 'POST', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
                .then(res => {
                    if (res.data) {
                        setIsLogin(false);
                    }
                })
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 400) {
                            setIsLogin(true);
                            notificationCustom("Nhắc Nhở", `Bạn không đủ quyền truy cập vào địa chỉ này`, "warning")
                        }
                    }
                })
            // setIsLogin(false)
            // setAdminAccount(localStorage.getItem('USERNAME'))
        }
    }, [])
    const dispatch = useDispatch()
    const [adminAccount, setAdminAccount] = useState()
    const [account, setAccount] = useState({ username: '', password: '' })
    const menuItems = [
        {
            id: "1",
            name: "Dashboard",
            icon: faHome
        },
        {
            id: "2",
            name: "Live Chat",
            icon: faInbox
        },
        // {
        //     id: "3",
        //     name: "Email",
        //     icon: faEnvelope
        // },
        {
            id: "3",
            name: "Orders",
            icon: faFileInvoice
        },
        {
            id: "4",
            name: "Products",
            icon: faTshirt
        },
        {
            id: "5",
            name: "News",
            icon: faNewspaper
        },
        {
            id: "6",
            name: "Users",
            icon: faUser
        },
        {
            id: "7",
            name: "Collection",
            icon: faShoppingBag
        },
        {
            id: "8",
            name: "Subscribers",
            icon: faEnvelope
        },
    ]
    const [isLogin, setIsLogin] = useState(true);
    const [tabId, setTabId] = useState("1");
    const [openMenu, setOpenMenu] = useState(true);
    const [openMenuMobile, setOpenMenuMobile] = useState(true);
    const [productId, setProductId] = useState("")
    const socket = socketIOClient(ENDPOINT);
    const [orderNotice, setOrderNotice] = useState(null)
    const handleChange = (event) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value
        })
    }
    const handleLogin = (acc) => {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('USERNAME')
        if (!acc || !acc.username || !acc.password) {
            notificationCustom("Nhắc Nhở", "Vui lòng nhập đầy đủ các trường", "danger")
        } else if (acc) {
            requestAPI('/account/signinDashboard', 'POST', acc)
                .then(res => {
                    setAdminAccount(res.data)
                    setIsLogin(false);
                    notificationCustom("Thông Báo", `Xin Chào, ${res.data.fullname}`, "success")
                    localStorage.setItem('TOKEN', res.data.accessToken)
                    localStorage.setItem('USERNAME', res.data.fullname)
                    // window.location.reload();
                })
                .catch(err => {
                    console.log(err.response.status);
                    if (err.response) {
                        if (err.response.status === 500) {
                            notificationCustom("Nhắc Nhở", `Sai tài khoản hoặc mật khẩu`, "warning")
                        }
                        if (err.response.status === 404) {
                            notificationCustom("Nhắc Nhở", `Sai tài khoản hoặc mật khẩu`, "warning")
                        }
                        if (err.response.status === 401) {
                            notificationCustom("Nhắc Nhở", `Bạn không đủ quyền truy cập vào địa chỉ này`, "warning")
                        }
                        if (err.response.status === 304) {
                            notificationCustom("Nhắc Nhở", `Bạn không đủ quyền truy cập vào địa chỉ này`, "warning")
                        }
                    }
                })
        }
    }
    const handleLogout = (bool) => {
        setIsLogin(bool);
    }
    const setTabIdOnClick = (id) => {
        setTabId(id);
    }
    const setOpenMenuOnClick = () => {
        if (window.innerWidth <= 1110) {
            setOpenMenu(true);
            if (openMenuMobile) setOpenMenuMobile(false);
            else setOpenMenuMobile(true);
        } else {
            if (openMenu) setOpenMenu(false);
            else setOpenMenu(true);
        }
    }

    const [openCreate, setOpenCreate] = useState(false)
    const [openCreateAuthor, setOpenCreateAuthor] = useState(false)

    const setOpenCreateFunc = () => {
        document.body.style.overflow = 'hidden';
        setOpenCreate(true)
    }
    const setCloseCreateFunc = (bool) => {
        document.body.style.overflow = 'unset';
        setOpenCreate(bool)
    }
    const setOpenCreateAuthorFunc = () => {
        document.body.style.overflow = 'hidden';
        setOpenCreateAuthor(true)
    }
    const setCloseCreateAuthorFunc = (bool) => {
        document.body.style.overflow = 'unset';
        setOpenCreateAuthor(bool)
    }

    const [openEdit, setOpenEdit] = useState(false)

    const setOpenEditFunc = (product, productId) => {
        document.body.style.overflow = 'hidden';
        setOpenEdit(true)
        setProductId(productId)
        dispatch(update(product));
        dispatch(updatePoster(product));
        dispatch(updateAccount(product));
    }

    const setCloseEditFunc = (bool) => {
        document.body.style.overflow = 'unset';
        setOpenEdit(bool)
    }
    const [openEditAuthor, setOpenEditAuthor] = useState(false)

    const setCloseEditAuthorFunc = (bool) => {
        document.body.style.overflow = 'unset';
        setOpenEditAuthor(bool)
    }
    return (
        <div>
            <Notification />
            <ReactNotification />
            {isLogin
                ?
                <div className="Dashboard" style={{
                    height: "100vh",
                    width: "100vw",
                    background: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <div className="subLogin--active" style={{
                        height: "50%",
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}>
                        <h1 className="subLogin__title">Sign In</h1>
                        <div className="subLogin__container">
                            <label className="subLogin__container-title"> Tài Khoản : </label>
                            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                            <input className="subLogin__container-txtValue" style={{ padding: "10px 5px 7px 35px" }} name="username" value={account.username} type="text" onChange={handleChange} >
                            </input>
                            <label className="subLogin__container-title"> Mật Khẩu : </label>
                            <i class="fa fa-key" aria-hidden="true"></i>
                            <input className="subLogin__container-txtValue" style={{ padding: "10px 5px 7px 35px" }} name="password" value={account.password} type="password" onChange={handleChange} />
                        </div>
                        <button type="button" class="btn btn-primary subLogin__btn" onClick={() => handleLogin(account)}> Đăng Nhập </button>
                        <div className="subLogin__control">
                            <span className="subLogin__control-OR"> or </span>
                            <div className="subLogin__control-link">
                                <Link to="/" className="subLogin__control-link-cover subLogin__control-link-cover--facebook">
                                    <i class="fa fa-facebook subLogin__control-link-cover-icon " aria-hidden="true"></i>
                                </Link>
                                <Link to="/" className="subLogin__control-link-cover">
                                    <i class="fa fa-google subLogin__control-link-cover-icon" aria-hidden="true"></i>
                                </Link>
                                <Link to="/" className="subLogin__control-link-cover">
                                    <i class="fa fa-twitter subLogin__control-link-cover-icon   " aria-hidden="true"></i>
                                </Link>
                            </div>
                            <div className="subLogin__control-signUp">
                            </div>
                            <Link to="/" className="subLogin__control-ForgotPass">Quên Mật Khẩu</Link>
                        </div>
                    </div>
                </div>

                : <div className="Dashboard flex">

                    <DashboardMenu
                        setTabIdOnClick={setTabIdOnClick}
                        setOpenMenuOnClick={setOpenMenuOnClick}
                        tabId={tabId}
                        menuItems={menuItems}
                        openMenu={openMenu}
                        openMenuMobile={openMenuMobile}
                        setCloseCreateFunc={setCloseCreateFunc}
                        setCloseEditFunc={setCloseEditFunc}
                        setCloseCreateAuthorFunc={setCloseCreateAuthorFunc}
                        setCloseEditAuthorFunc={setCloseEditAuthorFunc}
                        userInfo={adminAccount}
                        handleLogout={handleLogout}
                    />

                    <DashboardBody
                        tabId={tabId}
                        menuItems={menuItems}
                        openMenu={openMenu}
                        openMenuMobile={openMenuMobile}
                        openCreate={openCreate}
                        openCreateAuthor={openCreateAuthor}
                        openEdit={openEdit}
                        setOpenMenuOnClick={setOpenMenuOnClick}
                        setOpenCreateFunc={setOpenCreateFunc}
                        setOpenCreateAuthorFunc={setOpenCreateAuthorFunc}
                        setCloseCreateFunc={setCloseCreateFunc}
                        setCloseCreateAuthorFunc={setCloseCreateAuthorFunc}
                        setOpenEditFunc={setOpenEditFunc}
                        setCloseEditFunc={setCloseEditFunc}
                        productId={productId}
                        orderNotice={orderNotice}
                    />
                </div>
            }
        </div>

    )
}
export default withRouter(Dashboard)