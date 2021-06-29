import React, { useState } from 'react';
import Photogrid from "react-facebook-photo-grid";
import CommentItem from '../blog/CommentItem';
import Comments from '../blog/BlogComment'
export default function SocialPost(props) {
    const [scale, setScale] = useState(false)
    var avatar = props.avatar;
    var imageData = [
        avatar,
        avatar,
        avatar,
        avatar,
        avatar,
        avatar,
    ];
    return (
        <div className="social__item">
            <div className="social__post">
                <div className="social__post-avatar">
                    <div className="social__post-avatar-wrapper">
                        <img className="social__post-avatar-wrapper-pic" src={avatar} alt="avatar" />
                    </div>
                </div>
                <div className="social__post-content">
                    <div className="social__post-content-author">
                        <h3 className="action__list-comments-name social__post-content-author-name">Anh Da Đen</h3>
                        <span className="social__post-content-author-time">
                            <i class="fa fa-clock-o pr-2" aria-hidden="true"></i> 30 phút trước
                    </span>
                    </div>
                    <div className="social__post-content-container">
                        <p className="social__post-content-container-text">
                            Đàn bà là những niềm đau. Anh em dù biết vẫn theo sau đàn bà.
                    </p>
                        <div className="social__post-content-container-image">

                            <Photogrid
                                images={imageData}
                            />

                        </div>
                    </div>
                </div>

            </div>
            <div className="social__comments">
                <Comments avatar={avatar} id={"txtComment"} />
                <CommentItem
                    avatar={avatar}
                    avatarFriend={avatar}
                />
            </div>
        </div>
    )
}
