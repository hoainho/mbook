import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classname';
export default function RatingItem(props) {
    const { avatarFriend, avatar, infomation } = props;
    const [like, setLike] = useState(false);
    const handleLikeReply = () => {
        let newValue = like;
        newValue = !newValue;
        setLike(newValue);
    }
    return (
        <div className="action__list rating">
            <div className="action__list-avatar rating__avatar">
                <img className="action__list-avatar-image" src={avatar} />
            </div>
            <div className="action__list-comments rating__content">
                <div >
                    <h3 className="action__list-comments-name rating__content-title">Anh Da Đen</h3>
                    <span className="rating__content-date">
                        <i class="fa fa-clock-o pr-2" aria-hidden="true"></i> 30 phút trước
                    </span>
                </div>
                <div className="rating__content-container">
                    <div className="rating__content-container-image">
                        <img className="rating__content-container-image-pic" src={props.book} alt="image" />
                    </div>
                    <div>
                        <div className="rating__content-container-decsription">
                            <h2 className="rating__content-container-decsription-title">
                                Anh Da Đen và những câu chuyện
                            </h2>
                            <p className="rating__content-container-decsription-text">
                                that have a near-identical initial appearance for single, multiple, and disabled
                                select elements across the top browsers. A few properties and techniques our
                                solution will use: clip-path to create the custom dropdown arrow.
                                perties and techniques our
                                solution will use: clip-path to create the custom dropdown arrow.
                            </p>
                            <Link to="/reviewsDetails"> Đọc tiếp</Link>

                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
