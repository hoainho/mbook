import React, { useState, useEffect } from 'react'
import classnames from 'classnames';
import { FaTimes, } from 'react-icons/fa';
import { social, links } from './data';
import logoDark from './logoDark.png'
import logoLight from './logoLight.png'
import avtar from './avatar.jpg'
import { Link } from 'react-router-dom'
import { Checkbox, Table } from 'antd';
import { DollarOutlined } from '@ant-design/icons'
import MediaPlayer from '../MediaPlayer';
const getStorageTheme = () => {
    let theme = 'light-theme';
    if (localStorage.getItem('theme')) {
        theme = localStorage.getItem('theme');
    }
    return theme;
};

export default function Navbar(props) {
    const [theme, setTheme] = useState(getStorageTheme());
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [data, setData] = useState()
    const handleSocial = (status) => {
        props.handleStatusSocial(status);
    }
    const toggleTheme = () => {

        if (theme === 'light-theme') {
            setTheme('dark-theme');
            setDarkMode(true)
        } else {
            setTheme('light-theme');
            setDarkMode(false)
        }
    };

    useEffect(() => {
        document.documentElement.className = theme;
        if (theme === 'dark-theme') {
            setDarkMode(true)
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const openSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }


    return (
        <div className='header-wrapper'>
            <div className='header'>

                {/* =================== MENU MOBIE ================== */}
                <div className='header__menuMobie'>
                    <i class="fa fa-bars" aria-hidden="true" onClick={openSidebar}></i>
                    <div className={classnames('header__menuMobie-wrap', { 'header__menuMobie-wrap--show': isSidebarOpen })}>
                        <div className='header__menuMobie-wrap-img'>
                            {
                                darkMode ? <img src={logoDark} alt='logo' /> : <img src={logoLight} alt='logo' />
                            }
                            <div className='close-btn' onClick={openSidebar}>
                                <FaTimes />
                            </div>
                        </div>
                        <ul className='header__menuMobie-wrap-links'>
                            {links.map((link) => {
                                const { id, url, text, icon } = link;
                                return (
                                    <li key={id}>
                                        <a href={url}>
                                            {icon}
                                            {text}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='header__menuMobie-wrap-control'>
                            <ul className='header__menuMobie-wrap-socialIcons'>
                                {social.map((link) => {
                                    const { id, url, icon } = link;
                                    return (
                                        <li key={id}>
                                            <a href={url}>{icon}</a>
                                        </li>
                                    );
                                })}

                            </ul>
                            <div className={classnames('header__search-darkTheme', { 'header__search-darkTheme--darkMode': darkMode })}>
                                <input type="checkbox" id="custom-toggle" onClick={toggleTheme} hidden />
                                <label htmlFor="custom-toggle">
                                    <span className="header__search-darkTheme-btn"><i class="fa fa-moon-o" aria-hidden="true"></i></span>
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className={classnames('header__menuMobie-background', { 'header__menuMobie-background--show': isSidebarOpen })} onClick={openSidebar}>
                    </div>
                </div>

                {/* =================== LOGO ================== */}
                <Link className='header__logo' to='/'>
                    {
                        darkMode ? <img src={logoDark} alt='logo' /> : <img src={logoLight} alt='logo' />
                    }
                </Link>


                {/* =================== SEARCH ================== */}


                <div className='header__search'>
                    <div className='header__search-main'>
                        <div className='header__search-main-btn'>
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                        <input type="text" className="header__search-main-input" placeholder='Search...' />
                    </div>
                    <div className={classnames('header__search-darkTheme', { 'header__search-darkTheme--darkMode': darkMode })}>
                        <input type="checkbox" id="custom-toggle" onClick={toggleTheme} hidden />
                        <label htmlFor="custom-toggle">
                            <span className="header__search-darkTheme-btn"><i class="fa fa-moon-o" aria-hidden="true"></i></span>
                        </label>
                    </div>
                    <div className="header__social">
                        <Link className="header__social-wrapper" to="/social" onClick={() => handleSocial(true)}>
                            <span className="header__social-wrapper-btn"><i class="fa fa-connectdevelop" aria-hidden="true"></i></span>
                        </Link>
                    </div>
                </div>

                {/* =================== CONTROL ================== */}


                <div className='header__control'>
                    <div className='header__control-account' onClick={handleIsLogin}>
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    </div>

                    <div className={classnames('subLogin', { 'subLogin--active': isLogin })}>
                        <h1 className="subLogin__title">Sign In</h1>

                        <div className="subLogin__container">
                            <label className="subLogin__container-title"> Tài Khoản : </label>
                            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                            <input className="subLogin__container-txtValue" name="userName" type="text" onChange={handleChange} >
                            </input>
                            <label className="subLogin__container-title"> Mật Khẩu : </label>
                            <i class="fa fa-key" aria-hidden="true"></i>
                            <input className="subLogin__container-txtValue" name="password" type="password" onChange={handleChange} />
                        </div>

                        <button type="button" class="btn btn-primary subLogin__btn" onClick={handleLogin}> Đăng Nhập </button>

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
                                <Link to="/" className="subLogin__control-signUp-btn" onClick={handleIsRegister}>Đăng Kí</Link>
                            </div>
                            <Link to="/" className="subLogin__control-ForgotPass">Quên Mật Khẩu</Link>
                        </div>
                    </div>

                    {/* Register */}
                    <div className={classnames('subLogin subRegister', { 'subRegister--active': isRegister })}>
                        <h1 className="subLogin__title">Sign Up</h1>

                        <div className="subLogin__container">
                            <label className="subLogin__container-title"> Họ Và Tên : </label>
                            <input className="subLogin__container-txtValue" name="fullName" type="text" onChange={handleChange} />
                            <label className="subLogin__container-title"> Tài Khoản : </label>
                            <input className="subLogin__container-txtValue" name="userName" type="text" onChange={handleChange} />
                            <label className="subLogin__container-title"> Mật Khẩu : </label>
                            <input className="subLogin__container-txtValue" name="password" type="password" onChange={handleChange} />
                            <label className="subLogin__container-title"> Nhập Lại Mật Khẩu : </label>
                            <input className="subLogin__container-txtValue" name="repeatPassword" type="password" onChange={handleChange} />
                        </div>
                        <Checkbox className="subRegister__checked" onChange={handleCheckedBox}> Đồng ý với <Link className="subRegister__checked-link"> Điều Khoản M-Book</Link></Checkbox>
                        <button type="button" class="btn btn-primary subLogin__btn subRegister__btn" onClick={handleRegister}> Đăng Ký </button>

                    </div>

                    <div className={classnames('over', { 'over--active': isRegister })} onClick={handleIsLogin}></div>
                    <div className={classnames('over', { 'over--active': isLogin })} onClick={handleIsLogin}></div>

                    <div className='header__control-cart'>
                        <i class=" fa fa-shopping-bag header__control-cart-icon" aria-hidden="true"></i>
                        <div className='header__control-cart-quantity'>
                            <span>0</span>
                        </div>
                        <div className='header__control-cart-sub'>
                            <div className='header__control-cart-sub-content'>
                                <div className="shopping-cart">
                                    <div className="shopping-cart-header">
                                        <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">16</span>
                                        <div className="shopping-cart-total">
                                            <i class="fa fa-money" aria-hidden="true"></i>
                                            <span className="main-color-text total"> 520.000đ</span>
                                        </div>
                                    </div>

                                    <ul className="shopping-cart-items">
                                        <li className="shopping-cart-items-item clearfix">
                                            <img src="https://www.qispackaging.com.au/getmetafile/fefe4afb-dd4d-495e-ad59-209f29b47052/XMREDTREE.aspx" alt="item1" />
                                            <span className="item-name">XMREDTREE</span>
                                            <span className="item-detail">Pack 100</span>
                                            <span className="item-price">$49.50</span>
                                        </li>

                                        <li className="clearfix">
                                            <img src="https://www.qispackaging.com.au/getmetafile/306f6d39-792f-4c8c-b101-9c6aef675758/XMWHREIN.aspx" alt="item1" />
                                            <span className="item-name">XMWHREIN</span>
                                            <span className="item-detail">Pack 100</span>
                                            <span className="item-price">$34.06</span>
                                        </li>

                                        <li className="clearfix">
                                            <img src="https://www.qispackaging.com.au/getmetafile/b2f41988-a7b4-432c-b9c2-25bcb9afbcc3/XMJBRR.aspx" alt="item1" />
                                            <span className="item-name">XMJBRR</span>
                                            <span className="item-detail">Pack 25</span>
                                            <span className="item-price">$14.21</span>
                                        </li>
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
            </div>
        </div >
    )
}