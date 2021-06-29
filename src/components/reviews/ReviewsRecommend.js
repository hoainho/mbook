import React from 'react'
import ReviewPostList from './ReviewPostList'

export default function ReviewsRecommend(props) {
    const Link = props.Link
    const title = props.title
    const icon = props.icon
    return (
        <div className="blog__container-aside-wrapper blog__container-aside-wrapper-recommend">
            <div className="blog__container-aside-wrapper-title">
                <h3 className="blog__container-aside-wrapper-title-text" >{title}</h3>
            </div>
            <ReviewPostList Link={Link} icon={icon} />

        </div>

    )
}
