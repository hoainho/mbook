import React, { useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt'
export default function PopularAuthor() {
    useEffect(() => {
        const elements = document.querySelectorAll(".popularAuthor__sub-social-icon");
        VanillaTilt.init(elements);
    }, [])
    return (
        <div className='popularAuthor' style={{ background: 'url("https://source.unsplash.com/DSwBHyWKiVw/1280x720") no-repeat left / 120%' }}>
            <div className='popularAuthor__sub m-8 l-8 c-8'>
                <div className="popularAuthor__sub-header-wrap" >

                    <div className='popularBook__header popularAuthor__sub-header'>
                        <h2 aria-label="Tác Giả ♡"></h2>
                    </div>
                </div>


                <p className='popularAuthor__sub-name'>J. K. <br></br>Rowling</p>
                <div className='popularAuthor__sub-description'>Tác Giả có số lượng sách bán chạy nhất tháng 6</div>
                <div className='popularAuthor__sub-social'>
                    <a href='https://www.facebook.com/nho.hoai.1610092'
                        data-tilt data-tilt-glare data-tilt-max="50" transition data-tilt-speed="400"
                        data-tilt-perspective="500" className='popularAuthor__sub-social-icon'>
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a href='https://www.instagram.com/rem.alw_/'
                        data-tilt data-tilt-glare data-tilt-max="50" transition data-tilt-speed="400"
                        data-tilt-perspective="500" className='popularAuthor__sub-social-icon'>
                        <i class="fa fa-instagram" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            <div className='popularAuthor__img  m-4 l-4 c-4' style={{ backgroundImage: 'url(https://skybook-16ed9.kxcdn.com/demo-01/wp-content/uploads/2018/12/banner2.jpg)' }}>
                {/* x   <img src='https://skybook-16ed9.kxcdn.com/demo-01/wp-content/uploads/2018/12/banner2.jpg' alt='imgg' /> */}
                <div className='popularAuthor__img-over'></div>
            </div>
        </div >
    )
}
