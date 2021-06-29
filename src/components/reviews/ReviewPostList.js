import React from 'react'
import ReviewsPostItem from './ReviewsPostItem'

export default function ReviewPostList(props) {
    const Link = props.Link
    const icon = props.icon
    return (
        <div className="blog__container-aside-wrapper-post">
            <ul className="blog__container-aside-wrapper-post-list">
                <ReviewsPostItem text="Cảm nhận đắc nhâm tâm sau 2 ngày" Link={Link} icon={icon} />
                <ReviewsPostItem text="Anh da đen và những người bạn" Link={Link} icon={icon} />
                <ReviewsPostItem text="Đừng quên tên anh" Link={Link} icon={icon} />
                <ReviewsPostItem text="Bố già và những câu chuyện" Link={Link} icon={icon} />
                <ReviewsPostItem text="Anh da đen và những người bạn" Link={Link} icon={icon} />
            </ul>
        </div>
    )
}
