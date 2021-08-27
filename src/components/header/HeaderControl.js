import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames';
import { Checkbox } from 'antd';
import 'react-notifications-component/dist/theme.css'
import notificationCustom from '../../notification';
import { useSelector } from 'react-redux';
export default function HeaderControl(props) {
    const [account, setAccount] = useState({ username: '', password: '' })
    const [fullNameDisplay, setFullNameDisplay] = useState()
    const [changePassword, setChangePassword] = useState({ passwordOld: '', passwordNew: '', repeatpasswordNew: '' })
    const [accountRegister, setAccountregister] = useState(
        { fullname: '', username: '', password: '', repeatpassword: '', roleid: false, status: false });
    const [ckbRule, setCkbRule] = useState(false)
    const handleIsLogin = props.handleIsLogin
    const isChangePassword = props.isChangePassword
    const isLogin = props.isLogin
    const handleIsRegister = props.handleIsRegister
    const isRegister = props.isRegister
    const handleIsChangePassword = props.handleIsChangePassword
    const confirmLogin = props.confirmLogin
    const handleChangePassword = props.handleChangePassword
    const APIAccount = props.APIAccount
    const handleLogOut = props.handleLogOut
    const [totalPrice, setTotalPrice] = useState(0)
    ///////////////////////////////////////
    const cart = useSelector((state) => state.cart.Carts)
    const cartLength = useSelector((state) => state.cart.numberCart)
    useEffect(() => {
        setFullNameDisplay(localStorage.getItem('USERNAME'))
        console.log({ cartLength });
        console.log({ cart });
    }, [localStorage.getItem('USERNAME')])
    const handleChange = (event) => {
        setAccount({
            ...account,
            [event.target.name]: event.target.value
        })
    }
    const handleChangeEditPassword = (event) => {
        setChangePassword({
            ...changePassword,
            [event.target.name]: event.target.value
        })
    }
    const handleChangeRegister = (event) => {
        setAccountregister({
            ...accountRegister,
            [event.target.name]: event.target.value
        })
    }
    const handleRegister = (accountRegister) => {
        accountRegister.createddate = new Date();
        if (!ckbRule) {
            notificationCustom("Nhắc Nhở", `Vui lòng chấp nhận điều khoản của M-book`, "warning")
            return;
        }
        props.handleRegister(accountRegister)
    }
    const handleLogin = (account) => {
        props.handleLogin(account);
    }
    return (
        <div className='header__control'>
            {/* Login */}
            <div className={classnames('header__control-account--display', { 'header__control-account--display--actived': confirmLogin })}>
                <div className="header__control-account-user">
                    <img className="header__control-account--display-avatar" src="../../../assets/ico.png" alt="picture" />
                    <h3 className="header__control-account--display-name">Hi, {fullNameDisplay ? fullNameDisplay : APIAccount?.fullname}</h3>
                    <div className="header__control-account-setting">
                        <ul className="header__control-account-setting-list">
                            <li className="header__control-account-setting-item" onClick={() => handleIsChangePassword(true)}>
                                <span className="header__control-account-setting-link">
                                    Đổi mật khẩu
                                </span>
                            </li >
                            <li className="header__control-account-setting-item" onClick={() => handleLogOut(true)}>
                                <Link to="/" className="header__control-account-setting-link">
                                    Đăng xuất
                                </Link>
                            </li >
                        </ul>
                    </div>
                </div>

            </div>

            <div className={classnames('header__control-account', { 'header__control-account--actived': confirmLogin })} onClick={() => handleIsLogin(true)}>
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
            </div>
            {/* Login */}
            <div className={classnames('subLogin', { 'subLogin--active': isLogin })}>
                <h1 className="subLogin__title">Sign In</h1>
                <div className="subLogin__container">
                    <label className="subLogin__container-title"> Tài Khoản : </label>
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <input className="subLogin__container-txtValue" name="username" value={account.username} type="text" onChange={handleChange} >
                    </input>
                    <label className="subLogin__container-title"> Mật Khẩu : </label>
                    <i class="fa fa-key" aria-hidden="true"></i>
                    <input className="subLogin__container-txtValue" name="password" value={account.password} type="password" onChange={handleChange} />
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
                        <span className="subLogin__control-signUp-title"> Bạn chưa có tài khoản ? </span>
                        <Link to="/" className="subLogin__control-signUp-btn" onClick={() => handleIsRegister(true)}>Đăng Kí</Link>
                    </div>
                    <Link to="/" className="subLogin__control-ForgotPass">Quên Mật Khẩu</Link>
                </div>
            </div>
            <div className={classnames('over', { 'over--active': isLogin })} onClick={() => handleIsLogin(false)}></div>

            {/* Register */}
            <div className={classnames('subLogin subRegister', { 'subRegister--active': isRegister })}>
                <h1 className="subLogin__title">Sign Up</h1>

                <div className="subLogin__container">
                    <label className="subLogin__container-title"> Họ Và Tên : </label>
                    <input className="subLogin__container-txtValue" name="fullname" type="text" value={accountRegister.fullname} onChange={handleChangeRegister} />
                    <label className="subLogin__container-title"> Tài Khoản : </label>
                    <input className="subLogin__container-txtValue" name="username" type="text" value={accountRegister.username} onChange={handleChangeRegister} />
                    <label className="subLogin__container-title"> Mật Khẩu : </label>
                    <input className="subLogin__container-txtValue" name="password" type="password" value={accountRegister.password} onChange={handleChangeRegister} />
                    <label className="subLogin__container-title"> Nhập Lại Mật Khẩu : </label>
                    <input className="subLogin__container-txtValue" name="repeatpassword" type="password" value={accountRegister.repeatpassword} onChange={handleChangeRegister} />
                </div>
                <Checkbox className="subRegister__checked" onChange={() => setCkbRule(!ckbRule)}> Đồng ý với <Link className="subRegister__checked-link"> Điều Khoản M-Book</Link></Checkbox>
                <button type="button" class="btn btn-primary subLogin__btn subRegister__btn" onClick={() => handleRegister(accountRegister)}> Đăng Ký </button>

            </div>
            <div className={classnames('over', { 'over--active': isRegister })} onClick={() => handleIsRegister(false)}></div>
            {/* Change Password */}
            <div className={classnames('subLogin subRegister', { 'subRegister--active': isChangePassword })}>
                <h1 className="subLogin__title">Setting</h1>

                <div className="subLogin__container">
                    <label className="subLogin__container-title"> Mật khẩu hiện tại :  </label>
                    <input className="subLogin__container-txtValue" name="passwordOld" type="text" value={changePassword.passwordOld} onChange={handleChangeEditPassword} />

                    <label className="subLogin__container-title"> Mật khẩu mới </label>
                    <input className="subLogin__container-txtValue" name="passwordNew" type="password" value={changePassword.passwordNew} onChange={handleChangeEditPassword} />

                    <label className="subLogin__container-title"> Nhập lại mật khẩu mới : </label>
                    <input className="subLogin__container-txtValue" name="repeatpasswordNew" type="password" value={changePassword.repeatpasswordNew} onChange={handleChangeEditPassword} />
                </div>
                <button type="button" class="btn btn-primary subLogin__btn subRegister__btn" onClick={() => handleChangePassword(changePassword)}> Xác Nhận </button>

            </div>
            <div className={classnames('over', { 'over--active': isChangePassword })} onClick={() => handleIsChangePassword(false)}></div>
            {/* Cart */}
            <div className='header__control-cart'>
                <i class=" fa fa-shopping-bag header__control-cart-icon" aria-hidden="true"></i>
                <div className='header__control-cart-quantity'>
                    <span>{cartLength} </span>
                </div>
                <div className='header__control-cart-sub'>
                    <div className='header__control-cart-sub-content'>
                        <div className="shopping-cart">
                            <div className="shopping-cart-header">
                                <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">{cartLength}</span>
                                <div className="shopping-cart-total">
                                    <i class="fa fa-money" aria-hidden="true"></i>
                                    <span className="main-color-text total">
                                        {cart?.totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                                </div>
                            </div>
                            {/* List Product  */}
                            <ul className="shopping-cart-items">
                                {cart?.detailCarts && cart.detailCarts.map(item => {
                                    return (
                                        <li key={item.id} className="shopping-cart-items-item clearfix">
                                            <img src={item.idProductNavigation?.imageBef} alt="ImageMinisize" />
                                            <div>
                                                <span className="item-name">{item.idProductNavigation?.name}</span>
                                                <span className="item-detail">{item.idProductNavigation?.IdAuthorNavigation?.name}</span>
                                                <span className="item-price">
                                                    {item.idProductNavigation?.priceSale
                                                        ? item.idProductNavigation?.priceSale?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                                                        : item.idProductNavigation?.priceOld?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                                </span>
                                                <span className="item-detail">x {item?.quantity}</span>
                                            </div>

                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className='header__control-cart-sub-detail'>
                            <div class="button-custom-1">
                                <Link to="/cart">
                                    <span class="mas">Thanh Toán</span>
                                    <button id='work' type="button" name="Hover">Đến Giỏ Hàng</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
