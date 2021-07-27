import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'antd';
import classnames from 'classname';
import { addToCart } from '../../features/cart/CartSlice';
import notificationCustom from '../../notification/index';
import { useDispatch } from 'react-redux';
export default function BodyStoreItem(props) {
    const [hover, setHover] = useState(false)
    const [number, setNumber] = useState(1);
    const { gridTab, book } = props
    const dispatch = useDispatch()
    const handleAddToCart = (itemCart) => {
        if (localStorage.getItem("TOKEN") !== null) {
            dispatch(addToCart({ ...itemCart, quantity: 1 }))
        } else {
            notificationCustom("Nhắc Nhở", `Vui lòng đăng nhập để thực hiện chức năng này`, "warning")
        }
    }
    const starsVote = Array.from({ length: book.rating }, () => '')
    const startEmpty = Array.from({ length: 5 - book.rating }, () => '')
    return (
        <>
            <Col className={classnames("bodyStoreItem__col", { "bodyStoreItem__col--grid": gridTab })} xs={{ span: 12 }} md={{ span: gridTab === 0 ? 6 : 4 }} lg={{ span: gridTab === 0 ? 6 : 4 }}>
                <div className={classnames('bodyStoreItem', { 'bodyStoreItem--gird': gridTab !== 0 })}
                    onMouseOver={() => { setHover(true) }}
                    onMouseOut={() => { setHover(false) }}
                >
                    <div className="bodyStoreItem__tagSale">
                        {book.hot ?
                            <div className="bodyStoreItem__tagSale--hot">
                                <span className={classnames("bodyStoreItem__tagSale--hot-wrap ", { "bodyStoreItem__tagSale--hot-wrap-grid ": gridTab !== 0 })}>
                                    HOT
                                </span>
                            </div>
                            : ''
                        }
                        {book.sale ?
                            <div className="bodyStoreItem__tagSale--sale">
                                <span className={classnames("bodyStoreItem__tagSale--sale-wrap ", { "bodyStoreItem__tagSale--sale-wrap-grid ": gridTab !== 0 })}>
                                    SALE
                                </span>
                            </div>
                            : ''}

                    </div>
                    <div className={classnames('bodyStoreItem__img', { 'bodyStoreItem__img--gird': gridTab !== 0 })}>
                        <div className='bodyStoreItem__img-bg'>
                            <img src={book.imageBef} alt='imgg' />
                            <img className={classnames('bodyStoreItem__img-bg-default', { 'bodyStoreItem__img-bg-default--hiden': !hover })} src={book.imageAf} alt='img' />
                        </div>
                        <div className={classnames("over-absolute", { "over-absolute--active": hover })}></div>
                        <div className='popularBook__item-img-sub'>
                            <div className="popularBook__item-img-sub-rating">
                                {starsVote && starsVote.map((item, key) => {
                                    return (
                                        <span key={key} className={classnames("popularBook__item-img-sub-rating-item", { "popularBook__item-img-sub-rating-item--grid": gridTab !== 0 })}>
                                            <i class={classnames(`fa fa-star`, { "fa fa-star --grid": gridTab !== 0 })} aria-hidden="true"></i>
                                        </span>
                                    )
                                })}
                                {startEmpty && startEmpty.map((item, key) => {
                                    return (
                                        <span key={key} className={classnames("popularBook__item-img-sub-rating-item", { "popularBook__item-img-sub-rating-item--grid": gridTab !== 0 })}>
                                            <i class={classnames("fa fa-star-o", { "fa fa-star-o --grid": gridTab !== 0 })} aria-hidden="true"></i>
                                        </span>
                                    )
                                })}
                            </div>

                            <div className="popularBook__item-img-sub-control">
                                <Link to={`/details/${book.idProduct}`} className={classnames('popularBook__item-img-sub--aniThir', { 'popularBook__item-img-sub--aniThir--grid': gridTab !== 0 })}><i className="fa fa-eye " aria-hidden="true" ></i></Link>
                                <Link onClick={() => handleAddToCart(book)} className={classnames('popularBook__item-img-sub--aniFr', { 'popularBook__item-img-sub--aniFr--grid': gridTab !== 0 })}><i className="fa fa-cart-plus" aria-hidden="true"></i></Link>
                            </div>

                        </div>
                    </div>
                    <div className={classnames('bodyStoreItem__title', { 'bodyStoreItem__title--grid': gridTab !== 0 })}>
                        {book.name}
                    </div>
                    <div className={classnames("bodyStoreItem__author", { "bodyStoreItem__author--grid": gridTab !== 0 })}>
                        {book.idAuthorNavigation?.name}
                    </div>
                    <div className={classnames("bodyStoreItem__price", { "bodyStoreItem__price--grid": gridTab !== 0 })}>
                        <span className={book.priceSale ? "bodyStoreItem__price-old" : 'bodyStoreItem__price-new'}>{book.priceOld?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</span>

                        {book.priceSale ? <span className='bodyStoreItem__price-new'>{book.priceSale ? `${book.priceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ` : ''}</span>
                            : ""}
                    </div>
                </div>
            </Col>

        </>
    )
}
