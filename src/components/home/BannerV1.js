import React, { useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt';
import image1 from './bookSlide1.png'
import image3 from './bookSlide3.png'
import image2 from './bookSlide2.png'
import image4 from './bookSlide4.png'
export default function BannerV1() {


    useEffect(() => {
        const elements = document.querySelectorAll(".banner-container-imageCover");
        VanillaTilt.init(elements);
    }, [])
    return (
        <div className='bannerV1'>
            <div className='row no-gutters'>
                <div className='m-6 c-12 l-6'>
                    <div className='bannerV1__item bannerV1__item--mr'>
                        <div className='bannerV1__item-bg'></div>
                        <div className="banner-container-imageCover" data-tilt data-tilt-glare data-tilt-max="50" transition data-tilt-speed="400" data-tilt-perspective="500">
                            <img src={image3} alt="imageSlide1" />
                        </div>
                        <div className='bannerV1__item-content'>
                            <div className='bannerV1__item-content-img'>
                                <img src={image3} alt='imageBanner'></img>
                            </div>
                            <div className='bannerV1__item-content-sub'>
                                <h2>The order of the Phoenix</h2>
                                <span className='author'>J.K. Rowling</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='m-6 c-12 l-6'>
                    <div className='bannerV1__item bannerV1__item--ml'>
                        <div className='bannerV1__item-bg' style={{ backgroundImage: 'url(https://thumbs.dreamstime.com/b/book-open-lying-table-sheets-fanned-out-orange-background-large-thick-hardcover-lies-light-wood-leaves-page-186651909.jpg)' }}></div>
                        <div className="banner-container-imageCover" data-tilt data-tilt-glare data-tilt-max="50" transition data-tilt-speed="400" data-tilt-perspective="500">
                            <img src={image4} alt="imageSlide1" />
                        </div>
                        <div className='bannerV1__item-content'>
                            <div className='bannerV1__item-content-img'>
                                <img src={image4} alt='imgg'></img>
                            </div>

                            <div className='bannerV1__item-content-sub'>
                                <h2>The order of the Phoenix</h2>
                                <span className='author'>J.K. Rowling</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
