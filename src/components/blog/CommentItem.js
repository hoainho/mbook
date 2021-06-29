import React, { useState } from 'react'
import Comments from './BlogComment'
import classname from 'classname'
export default function CommentItem(props) {

    const { avatarFriend, avatar, infomation } = props;
    const [like, setLike] = useState(false);
    const [actived, setActived] = useState(false);
    const handleLikeReply = () => {
        let newValue = like;
        newValue = !newValue;
        setLike(newValue);
    }
    const handleActive = () => {
        console.log(actived);
        let newAct = actived;
        newAct = !newAct;
        setActived(newAct);
    }
    return (
        <div className="action__list ">
            <div className="action__list-avatar">
                <img className="action__list-avatar-image" src={avatar} />
            </div>
            <div className="action__list-comments">
                <div>
                    <h3 className="action__list-comments-name">Anh Da Đen</h3>
                    <span className="action__list-comments-subName">
                        <i class="fas fa-pen-nib"></i>
                                        Tác Giả
                                        </span>
                    <p className="action__list-comments-content">
                        Hay quá
                                        </p>
                    <span className="action__list-comments-date">
                        30 phút trước
                                        </span>
                    <div className="action__interface-actived action__list-actived">
                        <div className={classname("action__interface-actived-likes", { "action__interface-actived-likes liked-active": like })} onClick={handleLikeReply}>
                            <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                            <span className="action__interface-actived-likes-quantity">
                                <span className="action__interface-actived-likes-quantity-number">0</span>
                            </span>
                        </div>
                        <label for="txtReply" className="action__interface-actived-comments" onClick={handleActive}>
                            <i class="fa fa-reply" aria-hidden="true"></i>
                            <span className="action__interface-actived-comments-quantity">
                                <span className="action__interface-actived-comments-quantity-number">0</span>
                            </span>
                        </label>
                    </div>
                </div>
                <div className={actived ? "actived-block" : "actived-none"}>
                    <Comments
                        avatar={avatarFriend}
                        id={"txtReply"}
                    />
                </div>

            </div>
        </div>

    )
}
