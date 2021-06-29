import React from 'react'
import classnames from 'classname';
export default function PopularBook(props) {
    let {status,contents} = props
    console.log({contents});
    const handleSetStatus = ()=>{
        props.handleSetStatus(false)
    }
    return (
        <div className={classnames('bookReview', {'bookReview--active': status})}>
            <div className='bookReview__header'>
                <div className='bookReview__header-author'>
                    <div className='bookReview__header-author-ava'>
                        <img src='https://portal.staralliance.com/cms/aux-pictures/prototype-images/avatar-default.png/@@images/image.png' alt='avatar' />
                    </div>
                    <span className='bookReview__header-author-name'>George R.R.Martin</span>
                </div>
                <div className='bookReview__header-close'>
                    <span onClick={handleSetStatus}><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                </div>
            </div>

            <div className='bookReview__title'>
                <h2 className='bookReview__title-main'>A Storm of swebsds sds ds</h2>
                <span className='bookReview__title-date'><i class="fa fa-clock-o" aria-hidden="true"></i> 20/10/2020</span>
            </div>

            <div className='bookReview__sub'>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
            </div>

            <div className='bookReview__action'>
                <div className='bookReview__action-like'>
                    <span><i class="far fa-heart"></i></span>
                    <span>20</span>
                </div>
                <div className='bookReview__action-comment'>
                    <span><i class="far fa-comment"></i></span>
                    <span>20</span>
                </div>
            </div>

            <div className='bookReview__detail'>
                <span>Continute Reading</span>
            </div>
        </div>
    )
}
