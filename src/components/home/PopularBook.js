import React, { useState } from 'react'
import BookReview from './BookReview'
import classnames from 'classname'
import image1 from './book1.jpg'
import image2 from './book2.jpg'
import image3 from './book3.jpg'
import image4 from './book4.jpg'
export default function PopularBook(props) {
    const images = [
        { image: image1 }, { image: image2 }, { image: image3 }, { image: image4 },
    ]
    const [statusBookReivew, setStatusBookReivew] = useState(false)
    const handleStatusBookReivew = () => {
        setStatusBookReivew(true);
    }
    const handleSetStatusFromChild = (value) => {
        setStatusBookReivew(value);
    }

    const handleSetStatus = () => {
        // status = false
        setStatusBookReivew(false);
    }
    return (
        <div className='popularBook'>
            <div className={classnames('over', { 'over--active': statusBookReivew })} onClick={handleSetStatus}></div>

            <div className='popularBook__header'>
                <h2 aria-label="Bài Viết Mới"></h2>
            </div>
            <div className='row sm-gutter'>
                {images.map((item, index) => {
                    return (
                        <div className='c-6 m-3 l-3' key={index}>
                            <div className='popularBook__item'>
                                <div className='popularBook__item-img'>
                                    <img src={item.image} alt='img' />
                                    <div className='popularBook__item-img-sub popularBook__control'>
                                        <span className='popularBook__item-img-sub--top popularBook__item-img-sub--aniSe'
                                            onClick={handleStatusBookReivew}><i class="fa fa-book-open" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className='popularBook__item-img-over'></div>
                                </div>
                                <div className='popularBook__item-sub'>
                                    <h3>The Half-Blood Prince</h3>
                                    <span>J.K.Rowling </span>
                                </div>
                            </div>
                            <BookReview status={statusBookReivew} contents={{ author: 'Anh Da Đen', date: '20/1/2021/', title: 'Tiêu Đề Temp', content: 'somthing' }} handleSetStatus={handleSetStatusFromChild} />
                        </div>

                    )
                })}
            </div>

        </div>
    )
}
