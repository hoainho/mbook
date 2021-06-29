import React, { useEffect } from 'react'
import letter from './letter.png';
import VanillaTilt from 'vanilla-tilt';
export default function Footer() {
    useEffect(() => {
        const elements = document.querySelectorAll(".popularAuthor__sub-social-icon");
        VanillaTilt.init(elements);
    }, [])
    return (
        <footer className="new_footer_area bg_color">
            <div className="footer-wrap">
                <div className="new_footer_top">
                    <div className="footer_bg">
                        <div className="footer_bg_one" />
                        <div className="footer_bg_two" />
                    </div>
                </div>
                <div className="row no-gutter footer footerMain ">
                    <div className="l-4 m-4 c-12">
                        <div className="footer__left">
                            <h1>M-BOOK</h1>
                            <span className="description">M book gradually expanded the market during the development of branches across the country, bringing a very unique culture of The Frog.</span>
                            <div className="footer__left-social">
                                <a href='https://www.facebook.com/nho.hoai.1610092'
                                    data-tilt data-tilt-glare data-tilt-max="50" transition data-tilt-speed="400"
                                    data-tilt-perspective="500" className='popularAuthor__sub-social-icon'>
                                    <i className="fa fa-facebook-square" aria-hidden="true" />
                                </a>
                                <a href='https://www.instagram.com/rem.alw_/'
                                    data-tilt data-tilt-glare data-tilt-max="50" transition data-tilt-speed="400"
                                    data-tilt-perspective="500" className='popularAuthor__sub-social-icon'>
                                    <i className="fa fa-instagram" aria-hidden="true" />
                                </a>
                                <a href='https://www.instagram.com/rem.alw_/'
                                    data-tilt data-tilt-glare data-tilt-max="50" transition data-tilt-speed="400"
                                    data-tilt-perspective="500" className='popularAuthor__sub-social-icon'>
                                    <i className="fa fa-envelope" aria-hidden="true" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="l-4 m-4 c-12">
                        <div className="footer__center">
                            <h1>CONTACT</h1>
                            <div className="footer__center-address">
                                <span><i className="fas fa-map-marker-alt" /></span> KTX ĐHQG Khu B, TP.Ho Chi Minh
                            </div>
                            <div className="footer__center-phone">
                                <span><i className="fa fa-phone" aria-hidden="true" /></span> 0372924454
                            </div>
                            <div className="footer__center-email">
                                <span><i className="fas fa-envelope" /></span> mbook@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className="l-4 m-4 c-12">
                        <div className="footer__right">
                            <h1>NEWSLETTER</h1>
                            <span>Đăng ký để nhận thông tin từ M-book</span>
                            <div className="footer__right-img">
                                <img src={letter} alt="imgg" />
                            </div>
                            <form className="footer__right-form">
                                <input type="email" placeholder="Địa chỉ email của bạn..." />
                                <button>ĐĂNG KÝ</button>
                            </form>
                            <div className="footer__right-payment">
                                <img src="https://res.cloudinary.com/the-frog/image/upload/v1594302109/the-frog-main/payment_uvfrex.png" alt="imgg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_bottom">
                <p className="mb-0 f_400">©2021 - M-Book </p>
                <p className='text-right'>Made by <i className="icon_heart" /> <a href="https://hoainho.github.io/Rem-Cv/">Anh Da Đen</a></p>
            </div>
        </footer>

    )
}
