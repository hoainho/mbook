import React from 'react'

export default function ReviewsPostItem(props) {
    const text = props.text
    const Link = props.Link
    const icon = props.icon
    return (
        <li className="blog__container-aside-wrapper-post-item">
            <span className="blog__container-aside-wrapper-post-icon">
                <i class={`fa fa-${icon}`} aria-hidden="true"></i>
            </span>
            <Link className="blog__container-aside-wrapper-post-link">
                {text}
            </Link>
        </li>
    )
}
