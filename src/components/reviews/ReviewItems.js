import classname from 'classname'
import React, { useState } from 'react'
import { Modal, Button, Col, Row } from 'antd';
import { ShareAltOutlined } from '@ant-design/icons';
import avatarCmt from './avatar.jpg'
import RatingItem from './RatingItem';
import { Link } from 'react-router-dom';
export default function ReviewItem(props) {
    const [hover, setHover] = useState(false)
    const { book } = props
    const gridTab = 1;
    const [item, setItem] = useState({
        name: "Book 1",
        price: "10",
        quanlity: 1

    })
    const [rotate, setRotate] = useState(false);
    const [visible, setVisible] = useState(false);
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
        let newValue = liked;
        newValue = !newValue;
        setLiked(newValue);
    }
    const handleRotate = () => {
        let newRotate = rotate
        newRotate = !rotate
        setRotate(newRotate);
    }
    console.log(visible);
    return (
        <Col className="bodyStoreItem__col" xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
            <div className='bodyStoreItem reviewItem'>
                <div className="bodyStoreItem__tagSale reviewItem__tag">
                    <div className="bodyStoreItem__tagSale--hot">
                        <span className={classname("bodyStoreItem__tagSale--hot-wrap ", { "bodyStoreItem__tagSale--hot-wrap-grid ": gridTab !== 0 })}>
                            New
                        </span>
                    </div>
                </div>
                <div className="bodyStoreItem__img reviewItem__img">
                    <div className='bodyStoreItem__img-bg'>
                        <img src={book} alt='imgg' />
                        <img className={classname('bodyStoreItem__img-bg-default', { 'bodyStoreItem__img-bg-default--hiden': !hover })} src={book} alt='img' />
                    </div>
                    <div className={classname("over-absolute", { "over-absolute--active": hover })}></div>
                    <div className='popularBook__item-img-sub reviewItem__button'>
                        <div className="popularBook__item-img-sub-rating" style={{ right: '10%' }}>
                            <span className={classname("popularBook__item-img-sub-rating-item", { "popularBook__item-img-sub-rating-item--grid": gridTab !== 0 })}>
                                <i class={classname("fa fa-star", { "fa fa-star --grid": gridTab !== 0 })} aria-hidden="true"></i>
                            </span>
                            <span className={classname("popularBook__item-img-sub-rating-item", { "popularBook__item-img-sub-rating-item--grid": gridTab !== 0 })}>
                                <i class={classname("fa fa-star", { "fa fa-star --grid": gridTab !== 0 })} aria-hidden="true"></i>
                            </span>
                            <span className={classname("popularBook__item-img-sub-rating-item", { "popularBook__item-img-sub-rating-item--grid": gridTab !== 0 })}>
                                <i class={classname("fa fa-star", { "fa fa-star --grid": gridTab !== 0 })} aria-hidden="true"></i>
                            </span>
                            <span className={classname("popularBook__item-img-sub-rating-item", { "popularBook__item-img-sub-rating-item--grid": gridTab !== 0 })}>
                                <i class={classname("fa fa-star-o", { "fa fa-star-o --grid": gridTab !== 0 })} aria-hidden="true"></i>
                            </span>
                            <span className={classname("popularBook__item-img-sub-rating-item", { "popularBook__item-img-sub-rating-item--grid": gridTab !== 0 })}>
                                <i class={classname("fa fa-star-o", { "fa fa-star-o --grid": gridTab !== 0 })} aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className="popularBook__item-img-sub-control">
                            <button onClick={() => setVisible(true)} className={classname('popularBook__item-img-sub--aniThir', { 'popularBook__item-img-sub--aniThir--grid': gridTab !== 0 })}><i class="fa fa-street-view" aria-hidden="true"></i></button>
                            <Link to="/reviewsDetails" className={classname('popularBook__item-img-sub--aniFr', { 'popularBook__item-img-sub--aniFr--grid': gridTab !== 0 })}><i className="fa fa-eye " aria-hidden="true" ></i></Link>
                        </div>

                    </div>
                </div>
                <div className='bodyStoreItem__title'>
                    Roll Top Backpack
                </div>
                <div className="bodyStoreItem__author">
                    Anh Da Đen
                </div>
                <div className="bodyStoreItem__price reviewItem__content">
                    <div className="blog__container-main-wrapper-post-content">
                        <p className="blog__container-main-wrapper-post-content-text">
                            Thoạt đầu, ấn tượng đầu tiên mà bạn có thể thấy về quyển sách này chính là cái bìa không quá
                            sặc sỡ của nó, với giá thành rất rẻ (76.000đ), hai màu xanh – đỏ nằm xen kẽ nhau và ở giữa là
                            dòng chữ ‘đắc nhân tâm’ được in đậm vô cùng rõ rệt nhằm mục đích đánh lừa thị giác.
                        </p>
                    </div>
                </div>
            </div>
            <Modal
                className="reivews__modal"
                title="Đánh Giá"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                footer={[
                    // <Button key="back" type="primary" shape="round" icon={<ShareAltOutlined />} size="large" >Chia Sẻ</Button>,
                ]}
            >
                <div className="reviews">
                    <Row >
                        <Col span={16}>
                            <div className="blogDetails__action reviews__wrapper">
                                <div className="reviews__wrapper-simulator">
                                    <div className="rating__total">
                                        <div className="rating__total-average">
                                            <h3 className="rating__total-average-content">4.8/5</h3>
                                            <div className="popularBook__item-img-sub-rating">
                                                <span className="popularBook__item-img-sub-rating-item rating__total-average-star">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                                <span className="popularBook__item-img-sub-rating-item rating__total-average-star">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                                <span className="popularBook__item-img-sub-rating-item rating__total-average-star">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                                <span className="popularBook__item-img-sub-rating-item rating__total-average-star">
                                                    <i class="fa fa-star" aria-hidden="true"></i>
                                                </span>
                                                <span className="popularBook__item-img-sub-rating-item rating__total-average-star">
                                                    <i class="fa fa-star-o" aria-hidden="true"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="rating__total-details">
                                            <ul className="rating__total-details-list">
                                                <li className="rating__total-details-item">
                                                    <Link to="/" className="rating__total-details-link">
                                                        Tất Cả
                                                    </Link>
                                                </li>
                                                <li className="rating__total-details-item">
                                                    <Link to="/" className="rating__total-details-link">
                                                        5 sao
                                                    </Link>
                                                </li>
                                                <li className="rating__total-details-item">
                                                    <Link to="/" className="rating__total-details-link">
                                                        4 sao
                                                    </Link>
                                                </li>
                                                <li className="rating__total-details-item">
                                                    <Link to="/" className="rating__total-details-link">
                                                        3 sao
                                                    </Link>
                                                </li>
                                                <li className="rating__total-details-item">
                                                    <Link to="/" className="rating__total-details-link">
                                                        2 sao
                                                    </Link>
                                                </li>
                                                <li className="rating__total-details-item">
                                                    <Link to="/" className="rating__total-details-link">
                                                        1 sao
                                                    </Link>
                                                </li>
                                                <li className="rating__total-details-item">
                                                    <Link to="/" className="rating__total-details-link">
                                                        Có Hình Ảnh/ Video
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className="action__interface">
                                        <div className="action__interface-creative">
                                            <Comments avatar={avatarCmt1} id={"txtComment"} />
                                        </div>
                                    </div> */}
                                    {/* Danh sách reviews  */}
                                    <RatingItem avatar={avatarCmt} book={book} />
                                    <RatingItem avatar={avatarCmt} book={book} />
                                    <RatingItem avatar={avatarCmt} book={book} />
                                    <RatingItem avatar={avatarCmt} book={book} />
                                    <RatingItem avatar={avatarCmt} book={book} />
                                </div>
                            </div>

                        </Col>
                        <Col span={8}>
                            <div className="details__image-container">
                                <div className="details__image-wrapper">
                                    {/* first */}
                                    <div class="details__image-wrapper-page" id="first">
                                        <div class="details__image-wrapper-back">
                                            <div class="details__image-wrapper-outer">
                                                <div class="details__image-wrapper-content">
                                                    <img src={book} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class={rotate ? "details__image-wrapper-page details__image-wrapper-page--nextRotate" : " details__image-wrapper-page details__image-wrapper-page--preRotate"} id="second">
                                        <div class="details__image-wrapper-front">
                                            <div class="details__image-wrapper-outer">
                                                <div class="details__image-wrapper-content">
                                                    <img src={book} />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="details__image-wrapper-back" id="third">
                                            <div class="details__image-wrapper-outer">
                                                <div class="details__image-wrapper-content">
                                                    <div class="details__image-wrapper-helper-class-to-make-bug-visbile">
                                                        <img src={book} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="details__image-wrapper-page" id="fourth">
                                        <div class="details__image-wrapper-front">
                                            <div class="details__image-wrapper-outer">
                                                <div class="details__image-wrapper-content">
                                                    <img src={book} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="details__image-control">
                                    <div className="details__image-control-rotate" onClick={handleRotate}>
                                        <span className="details__image-control-rotate-icon" >
                                            <i class="fa fa-undo" aria-hidden="true"></i>
                                        </span>
                                        <span className="details__image-control-rotate-text">
                                            Xoay
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </Col>
                    </Row>


                </div>

            </Modal>

        </Col >

    )
}

