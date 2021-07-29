import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import requestAPI from '../../../api/index'
import { useSelector } from 'react-redux';

export default function DashboardOrderCreate(props) {
    const [orderInfo, setOrderInfo] = useState();
    const orderState = useSelector(state => state.order)
    useEffect(() => {
        requestAPI(`/order/${orderState?.idView}`, 'GET')
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
                                {orderInfo?.idDiscountNavigation
                                    ? orderInfo.idDiscountNavigation.code
                                    : ' Không có'
                                }</p>
                        </div>
                    </div>
                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '30%' }}>
                            Tổng Tiền Giảm Giá :
                            <p style={{ fontWeight: "bold" }}>
                                {orderInfo?.idDiscountNavigation
                                    ? (orderInfo.idDiscountNavigation.type === false //ship
                                        ? `${orderInfo.idDiscountNavigation.money?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                        : `${orderInfo.idDiscountNavigation.money}%`)
                                    : ' Không có'
                                }</p>
                        </div>
                    </div>
                    <div className="create-box-row flex">
                        <div className="dashboard-right" style={{ width: "100%" }}>
                            <div className="" style={{ overflowY: 'hidden', flexWrap: 'wrap' }}>
                                {orderInfo &&
                                    orderInfo?.idBillNavigation.detailCarts.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="order-list-item"
                                            >
                                                <p style={{ fontWeight: "bold", width: '15%' }}>  <p class="index-circle">#{index + 1}</p> </p>
                                                <img src={item?.idProductNavigation?.imageBef} alt="imageProduct"></img>
                                                <p style={{ fontWeight: "bold", width: '40%' }}>  {item?.idProductNavigation?.name}</p>
                                                <div style={{ display: 'flex', alignItems: 'center', width: '15%' }}>
                                                    Số Lượng : <p style={{ fontWeight: "bold" }}>{item.quantity}</p>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', width: '20%', whiteSpace: "nowrap", justifyContent: " space-between" }}>
                                                    Tổng Tiền : <p style={{ fontWeight: "bold" }}>{item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</p>
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