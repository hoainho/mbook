import React, { useState, useEffect } from 'react';
import { Table, Input, Button, } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined, GiftOutlined, CheckCircleOutlined, RetweetOutlined } from '@ant-design/icons';
import ButtonCustom from '../../features/button';
import { useSelector } from 'react-redux';
import { deleteItem, increarse, decrearse, discount, addToCart, cartCheckout, cartReceived } from '../../features/cart/CartSlice';
import { useDispatch } from 'react-redux';
import notificationCustom from '../../notification/index';
import classnames from 'classname'
import requestAPI from '../../api/index';

export default function Cart() {
    const dispatch = useDispatch();
    const [txtDiscount, setTxtDiscount] = useState('')
    const [totalMoneyProduct, setTotalMoneyProduct] = useState(0)
    const [totalBill, setTotalBill] = useState(0)
    const [isBill, setIsBill] = useState(false)
    const [infoBill, setInfoBill] = useState({
        methodPay: "Trực Tiếp"
    })
    const [moneyShip, setMoneyShip] = useState(30000)
    const [discountMoney, setDiscountMoney] = useState(0)
    const [listCode, setListCode] = useState()
    const data = useSelector((state) => state.cart.Carts)
    const LengthCart = useSelector((state) => state.cart.numberCart)
    const Discount = useSelector((state) => state.cart.DiscountMoney)
    const methodPayList = [
        {
            id: '1',
            name: 'Trực Tiếp',
        },
        {
            id: '2',
            name: 'Visa'
        }
    ]
    useEffect(() => {
        let totalDiscount = 0
        let total = 0
        setTotalMoneyProduct(data.totalPrice)
        if (listCode) {
            if (listCode.type === false) {
                totalDiscount = listCode.money
                console.log({ money: listCode.money });
            } else {
                totalDiscount = (listCode.money * data.totalPrice) / 100
            }
            setDiscountMoney(totalDiscount);
        }
        total = (data.totalPrice + moneyShip) - totalDiscount
        setTotalBill(total)

    }, [LengthCart, listCode])
    useEffect(() => {
        requestAPI(`/cart/load`, 'GET', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    dispatch(cartReceived(res.data));
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        console.log("TOKEN TIME OUT");
                    }
                    if (err.response.status === 500) {
                        console.log({ err });
                    }
                }
            })

    }, [])
    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: "name",
            render: (value, record) => {
                let name = record.idProductNavigation?.name;
                return (<p>{name ? name : 'null'}</p>)
            }
        },
        {
            title: 'Giá ',
            dataIndex: '.priceSale' ? 'priceSale' : 'priceOld',
            key: "price",
            sorter: {
                compare: (a, b) => a.idProductNavigation?.priceSale - b.idProductNavigation?.priceSale,
                multiple: 3,
            },
            render: (value, record) => {
                let price = record.idProductNavigation?.priceSale ? record.idProductNavigation?.priceSale : record.idProductNavigation?.priceOld;
                return (<p>{price
                    ? price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    : 'null'} đ</p>)
            }
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: "quantity",
            sorter: {
                compare: (a, b) => a.idProductNavigation?.quantity - b.idProductNavigation?.quantity,
                multiple: 2,
            },
            render: (quantity, record) => {

                return (
                    <div><MinusCircleOutlined onClick={() => dispatch(addToCart({
                        ...record, quantity: -1, priceOld: record.idProductNavigation.priceOld,
                        priceSale: record.idProductNavigation.priceSale
                    }))} style={{ padding: '0 5px' }} /> {quantity}
                        <PlusCircleOutlined onClick={() => dispatch(addToCart({
                            ...record, quantity: 1, priceOld: record.idProductNavigation.priceOld,
                            priceSale: record.idProductNavigation.priceSale
                        }))} style={{ padding: '0 5px' }} /></div>)
            }
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'totalPrice',
            key: "totalPrice",
            sorter: {
                compare: (a, b) => a.idProductNavigation?.priceSale ?
                    a.idProductNavigation?.priceSale :
                    a.idProductNavigation?.priceOld - b.idProductNavigation?.priceSale ?
                        b.idProductNavigation?.priceSale :
                        b.idProductNavigation?.priceOld,
                multiple: 4,
            },
            render: (totalPrice, sord) => {
                let price = sord?.quantity * (sord.idProductNavigation?.priceSale ?
                    sord.idProductNavigation?.priceSale :
                    sord.idProductNavigation?.priceOld);
                return (
                    <p>{price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</p>

                )
            }
        },
        {
            title: 'Xóa',
            dataIndex: '',
            key: 'delete',
            render: (text, record) => <a
                onClick={() => dispatch(deleteItem(record))}
            ><i class="fa fa-trash-o" aria-hidden="true"></i></a>,
        },
    ];
    const handleDiscount = (event) => {
        setTxtDiscount(event.target.value)
    }
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const handleGetDiscount = (code) => {
        console.log({ Discount });
        var index = Discount ? Discount.map((item) => item.code).indexOf(code) : -1;
        if (index !== -1) {
            if (listCode) {
                console.log('code exist');
                if (listCode.code === code) {
                    notificationCustom("Thông Báo", `Mã Giảm Giá '${code}' Đã Được Áp Dụng`, "warning")
                } else {
                    notificationCustom("Thông Báo", `Mã Giảm Giá '${code}' Hợp Lệ`, "success")
                    setListCode(Discount[index])
                }
            } else {
                notificationCustom("Thông Báo", `Mã Giảm Giá '${code}' Hợp Lệ`, "success")
                setListCode(Discount[index])
            }
        } else {
            notificationCustom("Thông Báo", `Mã Giảm Giá '${code}' Không Tồn Tại`, "warning")
        }
    }
    const handleIsBill = (bool) => {
        setIsBill(bool)
    }
    const onChangeBill = (e) => {
        setInfoBill({ ...infoBill, [e.target.name]: e.target.value })
    }
    const handleOrder = (event) => {
        console.log({ idBill: data });
        event.preventDefault();
        let bill = { ...infoBill, createddate: new Date(), IdDiscountNavigation: { idDiscount: listCode?.idDiscount }, idBill: data?.idCart, idDiscount: listCode?.idDiscount, total: totalBill, totalMoneyProduct, ship: moneyShip, quantity: LengthCart }
        console.log({ bill });
        requestAPI(`/order`, 'POST', bill, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    notificationCustom("Thông Báo", `Đặt Hàng Thành Công`, "success")
                    dispatch(cartCheckout());
                    setIsBill(false);
                    ////////////////////////////////
                    // requestAPI(`/cart/${data.id}`, 'PUT', bill, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
                    //     .then(res => {
                    //         console.log({ response: res.data });
                    //         notificationCustom("Thông Báo", `Đặt Hàng Thành Công`, "success")
                    //         setIsBill(false);
                    //         dispatch(cartCheckout());
                    //     })
                    //     .catch(err => {
                    //         if (err.response) {
                    //             if (err.response.status === 403) {
                    //                 notificationCustom("Nhắc Nhở", `Chứng thực tài khoản đã hết hạn, vui lòng đăng nhập lại để thực hiện các chức năng `, "warning")
                    //             }
                    //             if (err.response.status === 500) {
                    //                 notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                    //             }
                    //         }
                    //     })
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        notificationCustom("Nhắc Nhở", `Bạn không đủ quyền `, "warning")
                    }
                    if (err.response.status === 500) {
                        notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
                    }
                }
            })
    }
    return (
        <div className="container-wrapper">
            <Table
                columns={columns}
                dataSource={data.detailCarts}
                onChange={onChange}
                pagination={false}
                expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>{record.image}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                }}
            />
            <div className="cart__control">
                <div className="cart__control-gift">
                    <Input value={txtDiscount} onChange={handleDiscount} size="large" placeholder="Nhập mã khuyến mãi" prefix={<GiftOutlined />} />
                    <Button onClick={() => handleGetDiscount(txtDiscount)} type="primary" shape="round" icon={<CheckCircleOutlined />} size="large">
                        Gửi Mã Giảm Giá
                    </Button>
                </div>
                {/* <Button type="primary" shape="round" icon={<RetweetOutlined />} size="large">
                    Cập Nhật
                </Button> */}
            </div>
            <div className="cart">
                <div className="cart__wrapper">
                    <div className="cart__wrapper-title">
                        <h3 className=" cart__wrapper-title-text">
                            Tổng Đơn Hàng
                        </h3>
                    </div>
                    <div className="cart__wrapper-content">
                        <div className="cart__wrapper-content-item">
                            <span className="cart__wrapper-content-item-title">Tổng tiền hàng</span>
                            <span className="cart__wrapper-content-item-price">
                                {totalMoneyProduct?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </span>
                        </div>
                        <div className="cart__wrapper-content-item">
                            <span className="cart__wrapper-content-item-title">Ship</span>
                            <span className="cart__wrapper-content-item-price">
                                {moneyShip?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </span>
                        </div>
                        <div className="cart__wrapper-content-item">
                            <span className="cart__wrapper-content-item-title">Mã Giảm Giá</span>
                            {discountMoney
                                ? <span className="cart__wrapper-content-item-price">
                                    {
                                        listCode?.money <= 100
                                            ? `- ${listCode?.money}%`
                                            : `- ${(listCode?.money).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                    }
                                </span>
                                : <span className="cart__wrapper-content-item-price">0đ </span>
                            }
                        </div>
                        <div className="cart__wrapper-content-item">
                            <span className="cart__wrapper-content-item-title" style={{ fontWeight: 'bold' }}>Tổng Tiền</span>
                            <span className="cart__wrapper-content-item-price" style={{ fontWeight: 'bold' }}>
                                {totalBill.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                            </span>
                        </div>
                    </div>
                    <div onClick={() => handleIsBill(true)}>
                        <ButtonCustom nameButton="Thanh Toán" icon="shopping-basket" />
                    </div>
                </div>
            </div>
            <div className={classnames('subLogin subRegister', { 'subRegister--active': isBill })}>
                <h1 className="subLogin__title" style={{ fontFamily: "serif" }}>Thông Tin Đơn Hàng</h1>

                <form onSubmit={handleOrder} className="subLogin__container">
                    <label className="subLogin__container-title"> Họ Và Tên : </label>
                    <input className="subLogin__container-txtValue" name="fullname" required type="text" onChange={onChangeBill} value={infoBill.fullname} />
                    <label className="subLogin__container-title"> Số Điện Thoại : </label>
                    <input className="subLogin__container-txtValue" name="numberPhone" required type="text" onChange={onChangeBill} value={infoBill.numberPhone} />
                    <label className="subLogin__container-title"> Địa Chỉ : </label>
                    <input className="subLogin__container-txtValue" name="address" required type="text" onChange={onChangeBill} value={infoBill.address} />
                    <label className="subLogin__container-title"> Phương thức thanh toán : </label>
                    <select style={{ width: "30%", marginRight: "5%" }}
                        onChange={(event) => { setInfoBill({ ...infoBill, methodPay: event.target.value }) }}
                        value={infoBill.methodPay}>
                        {/* {infoBill.methodPay ? '' : <option >{infoBill.methodPay}</option>} */}
                        {methodPayList.length > 0 &&
                            methodPayList.map(item => {
                                return (
                                    <option key={item?.id}>{item?.name}</option>
                                )
                            })
                        }
                    </select>
                    <button class="btn btn-primary subLogin__btn subRegister__btn" style={{ margin: "20px 20% 20px 0" }}> Đặt Hàng </button>

                </form>

            </div>
            <div className={classnames('over', { 'over--active': isBill })} onClick={() => handleIsBill(false)}></div>
        </div >
    );
}
