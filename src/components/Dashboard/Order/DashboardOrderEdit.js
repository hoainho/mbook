import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import requestAPI from '../../../api/index'
import { useSelector } from 'react-redux';

export default function DashboardOrderCreate(props) {
    const [orderInfo, setOrderInfo] = useState();
    const orderState = useSelector(state => state.order)
    useEffect(() => {
        requestAPI(`/order/details/${orderState?.idView}`, 'GET')
            .then(res => {
                setOrderInfo(res.data)
                console.log({ data: res.data });
            })
            .catch(err => {
                console.log("Faild from server : ", err);
            })
    }, [])
    const [hideText, setHideText] = useState(false)
    const openMenu = props.openMenu;
    useEffect(() => {
        if (openMenu === false) setHideText(true)
        if (openMenu === true) setHideText(false)
    }, [setHideText, openMenu])
    return (
        <div className="DashboardProductInfo" style={hideText === false ? { width: '85%' } : { width: '100%' }}>
            <div className="create-box">
                <div className="create-box-title flex">
                    <div className="create-box-title-text">
                        Thông Tin Đơn Hàng
                    </div>
                    <div
                        className="create-box-title-close flex-center-dashboard"
                        onClick={() => {
                            props.setCloseEditFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form >
                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                            Mã Giảm Giá :
                            <p style={{ fontWeight: "bold" }}>
                                {orderInfo?.codeDiscount
                                    ? orderInfo.codeDiscount.name
                                    : ' Không có'
                                }</p>
                        </div>
                    </div>
                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                            Tổng Tiền Giảm Giá :
                            <p style={{ fontWeight: "bold" }}>
                                {orderInfo?.codeDiscount
                                    ? (orderInfo.codeDiscount.type === false //ship
                                        ? `${orderInfo.codeDiscount.money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                        : `${orderInfo.codeDiscount.money}%`)
                                    : ' Không có'
                                }</p>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-right">
                            <div className="" style={{ overflowY: 'hidden', flexWrap: 'wrap' }}>
                                {orderInfo &&
                                    orderInfo?.bill.listProduct.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="order-list-item"
                                            >
                                                <p style={{ fontWeight: "bold", width: '15%' }}>  #{index + 1} </p>
                                                <img src={item.imageBef} alt="imageProduct"></img>
                                                <p style={{ fontWeight: "bold", width: '40%' }}>  {item.name}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', width: '20%' }}>
                                                    Số Lượng : <p style={{ fontWeight: "bold" }}>{item.quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div >
    )
}