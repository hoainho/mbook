import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

function Banner() {
    const [currentBanner, setCurrentBanner] = useState(1);

    // useEffect(() => {
    //     const slide = setInterval(() => {
    //         setCurrentBanner(currentBanner + 1)
    //     }, 20000);
    //     return () => {
    //         clearInterval(slide)
    //     }
    // }, [currentBanner])

    if (currentBanner > 3) {
        setCurrentBanner(1)
    }

    return (
        <div className="Banner flex-center">
            <div className="banner-container">
                <div className={classNames('banner-first ', {
                    hide: currentBanner !== 1
                })}>
                    <div className="banner-content">
                        <div className={currentBanner === 1 ? "banner-title fadeInDown" : "banner-title"}>
                            <span>Hoạt Động Xã Hội</span>
                            <span>Hoạt Động Xã Hội</span>
                        </div>
                        <div
                            className={currentBanner === 1 ? "banner-link fadeInUp" : "banner-link"}>
                            Mạng xã hội
                            <i class="fas fa-chevron-circle-right"></i>
                        </div>

                    </div>
                </div>

                <div className={classNames('banner-second ', {
                    hide: currentBanner !== 2
                })}>
                    <div className="banner-content">
                        <div className={currentBanner === 2 ? "banner-title fadeInDown" : "banner-title"} style={{ textAlign: "center" }}>
                            <span>Kho tàng của sách</span>
                            <span>Kho tàng của sách</span>
                        </div>
                        <div
                            className={currentBanner === 2 ? "banner-link fadeInUp" : "banner-link"}>
                            Kệ Sách
                            <i class="fas fa-chevron-circle-right"></i>
                        </div>
                    </div>

                </div>
                <div className={classNames('banner-third ', {
                    hide: currentBanner !== 3
                })}>
                    <div className="banner-content">
                        <div className={currentBanner === 3 ? "banner-title fadeInDown" : "banner-title"}>
                            <span>Chia sẻ cảm nghĩ</span>
                            <span>Chia sẻ cảm nghĩ</span>
                        </div>
                        <div
                            className={currentBanner === 3 ? "banner-link fadeInUp" : "banner-link"}>
                            Bài Viết
                            <i class="fas fa-chevron-circle-right"></i>
                        </div>
                    </div>

                </div>
            </div>
            <div className="choose-slide flex-center">
                <div
                    className={classNames('choose-line', {
                        choose_line_active: currentBanner === 1
                    })}
                    onClick={() => { setCurrentBanner(1) }}
                ></div>
                <div
                    className={classNames('choose-line', {
                        choose_line_active: currentBanner === 2
                    })}
                    onClick={() => { setCurrentBanner(2) }}
                ></div>
                <div
                    className={classNames('choose-line', {
                        choose_line_active: currentBanner === 3
                    })}
                    onClick={() => { setCurrentBanner(3) }}
                ></div>
            </div>
        </div>
    )
}
export default withRouter(Banner);