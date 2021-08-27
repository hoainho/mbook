import React, { useEffect, useState } from 'react'
import '../App.css'
import '../Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames'
import requestAPI from '../../../api';
import moment from 'moment'
import notificationCustom from '../../../notification/index';

export default function DashboardProductTable(props) {
    const table = [
        "Name",
        "Images",
        "Price",
        "Price Sale",
        "Sale",
        "Hot",
        "Category",
        "Quantity",
        "Date",
        "Rating",
        "Action"
    ]
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState(false)
    // const [searchInput, setSearchInput] = useState("")
    const [constProducts, setConstProducts] = useState([])
    const [isSortByName, setIsSortByName] = useState(false)
    const [isSortByPrice, setIsSortByPrice] = useState(false)
    const [isSortBySale, setIsSortBySale] = useState(false)
    const [isSortBySold, setIsSortBySold] = useState(false)

    useEffect(() => {
        requestAPI('/product', 'GET')
            .then(res => {
                if (res) {
                    console.log({ pro: res.data });
                    setProducts(res.data)
                    setConstProducts(res.data)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log('ERROR :' + err);
                }
            })
    }, [props.isChange, status])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const choosePage = (event) => {
        if (Number(event.target.id) === 0) {
            setCurrentPage(currentPage)
        } else if (Number(event.target.id) === -1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            } else {
                setCurrentPage(1);
            }
        } else if (Number(event.target.id) === 999) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(Number(event.target.id))
        }
    }

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const current = products.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pages = [];

    if (pageNumbers.length > 3) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1, currentPage + 2);
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else if (currentPage === pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else {
                pages.push(currentPage - 2, currentPage - 1, currentPage);
            }
        }
    } else if (pageNumbers.length === 3) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1, currentPage + 2);
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else if (currentPage === pageNumbers.length - 1) {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            } else {
                pages.push(currentPage - 2, currentPage - 1, currentPage);
            }
        }
    } else if (pageNumbers.length === 2) {
        if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage);
        } else {
            if (currentPage === 1) {
                pages.push(currentPage, currentPage + 1);
            } else if (currentPage === 2) {
                pages.push(currentPage - 1, currentPage);
            }
        }
    } else {
        if (currentPage === 1) {
            pages.push(currentPage);
        }
    }

    const deleteOnClick = (event) => {
        requestAPI(`/product/${event.target.id}`, 'DELETE', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    notificationCustom("Thông Báo", `${res.data}`, "success")
                    setStatus(!status)
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        notificationCustom("Nhắc Nhở", `Bạn không đủ quyền `, "warning")
                    }
                    if (err.response.status === 500) {
                        notificationCustom("Nhắc Nhở", `Sản phẩm này đang nằm trong giỏ hàng của khách hàng ! 
                        \n Nếu bạn cố gắng xóa nó hãy thử xóa giỏ hàng trước hoặc sau khi giao hàng.`, "danger")
                    }
                }
            })
    }

    const searchOnSubmit = (event) => {
        event.preventDefault()
    }
    const searchOnChange = (event) => {
        const searchInput = event.target.value
        const search = []
        if (searchInput !== '') {
            for (let i in constProducts) {
                if ((constProducts[i].name).toLowerCase().includes(searchInput.toLowerCase())) {
                    search.push(constProducts[i])
                }
            }
            setProducts(search)
        } else {
            setProducts(constProducts)
        }

    }

    const sortTable = (event) => {
        if (event.target.id === "ProductName") {
            if (isSortByName) {
                const sortByName = [...products]
                sortByName.sort(function (a, b) {
                    var nameA = a.name.toLowerCase();
                    var nameB = b.name.toLowerCase();
                    if (nameA === nameB) return 0;
                    return nameA > nameB ? 1 : -1;
                })
                setIsSortByName(false)
                setProducts(sortByName)
            } else {
                const sortByName = [...products]
                sortByName.sort(function (a, b) {
                    var nameA = a.name.toLowerCase();
                    var nameB = b.name.toLowerCase();
                    if (nameA === nameB) return 0;
                    return nameA < nameB ? 1 : -1;
                })
                setIsSortByName(true)
                setProducts(sortByName)
            }
        }
        if (event.target.id === "ProductPrice") {
            if (isSortByPrice) {
                const sortByPrice = [...products]
                sortByPrice.sort(function (a, b) {
                    var priceA = a.priceOld;
                    var priceB = b.priceOld;
                    if (priceA === priceB) return 0;
                    return priceA > priceB ? 1 : -1;
                })
                setIsSortByPrice(false)
                setProducts(sortByPrice)
            } else {
                const sortByPrice = [...products]
                sortByPrice.sort(function (a, b) {
                    var priceA = a.priceOld;
                    var priceB = b.priceOld;
                    if (priceA === priceB) return 0;
                    return priceA < priceB ? 1 : -1;
                })
                setIsSortByPrice(true)
                setProducts(sortByPrice)
            }
        }
        if (event.target.id === "ProductPrice Sale") {
            if (isSortBySale) {
                const sortBySale = [...products]
                sortBySale.sort(function (a, b) {
                    var saleA = a.priceSale;
                    var saleB = b.priceSale;
                    if (saleA === saleB) return 0;
                    return saleA > saleB ? 1 : -1;
                })
                setIsSortBySale(false)
                setProducts(sortBySale)
            } else {
                const sortBySale = [...products]
                sortBySale.sort(function (a, b) {
                    var saleA = a.priceSale;
                    var saleB = b.priceSale;
                    if (saleA === saleB) return 0;
                    return saleA < saleB ? 1 : -1;
                })
                setIsSortBySale(true)
                setProducts(sortBySale)
            }
        }
        if (event.target.id === "ProductQuantity") {
            if (isSortBySold) {
                const sortBySold = [...products]
                sortBySold.sort(function (a, b) {
                    var SoldA = parseInt(a.quantity, 10);
                    var SoldB = parseInt(b.quantity, 10);
                    if (SoldA === SoldB) return 0;
                    return SoldA > SoldB ? 1 : -1;
                })
                setIsSortBySold(false)
                setProducts(sortBySold)
            } else {
                const sortBySold = [...products]
                sortBySold.sort(function (a, b) {
                    var SoldA = parseInt(a.quantity, 10);
                    var SoldB = parseInt(b.quantity, 10);
                    if (SoldA === SoldB) return 0;
                    return SoldA < SoldB ? 1 : -1;
                })
                setIsSortBySold(true)
                setProducts(sortBySold)
            }
        }
    }
    const onUpdate = (status) => {
        setStatus(status)
    }
    return (
        <div className="topfive flex-col" style={{ width: '100%' }}>
            <div className={`headerbox flex-center-dashboard ${props.color}`}>
                <FontAwesomeIcon icon={props.icon} className="icon" />
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>{props.title}</p>
                </div>
                <div className="topfive-content flex-col">
                    <div className="dashboard-addnew flex">
                        <div
                            className="dashboard-addnew-btn btn"
                            onClick={props.setOpenCreateFunc}
                        >Thêm Sản Phẩm
                        </div>
                        <div
                            className="dashboard-addnew-btn btn"
                            onClick={props.setOpenCreateAuthorFunc}
                        >Thêm Tác Giả
                        </div>
                        <div className="dashboard-addnew-search">
                            <form onSubmit={searchOnSubmit}>
                                <input type="text" placeholder="Search records"
                                    onChange={searchOnChange}></input>
                            </form>
                        </div>
                    </div>
                    <table className="dashboard-table" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                            <tr>
                                {
                                    table && table.map((item, index) => {
                                        return (
                                            <th
                                                key={index} className="table-title"
                                                onClick={(event) => {
                                                    sortTable(event)
                                                }}
                                                id={`Product${item}`}
                                            >
                                                {item}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                            {
                                current.map((item, index) => {
                                    moment(item.createdDate).format('L')

                                    return (
                                        <tr key={index}>
                                            <td className="table-name table-mobile-productname">
                                                <p>{item.name}</p>
                                            </td>
                                            <td className="table-mobile-productimages" style={{ display: 'flex' }}>
                                                <img
                                                    src={item.imageBef}
                                                    width="70px" height="80px"
                                                    style={{ padding: '5px 0' }}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <p>{item.priceOld.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</p>
                                            </td>
                                            <td>
                                                {item.priceSale ? <p>{item.priceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</p> : 'NO'}
                                            </td>
                                            {item.sale === false ?
                                                <td className="table-mobile-productsale">
                                                    <p style={{ color: 'red' }}>NO</p>
                                                </td>
                                                :
                                                <td className="table-mobile-productsale">
                                                    <p style={{ color: 'green' }}>SALE</p>
                                                </td>
                                            }
                                            {item.hot === false ?
                                                <td className="table-mobile-productsale">
                                                    <p style={{ color: 'red' }}>NO</p>
                                                </td>
                                                :
                                                <td className="table-mobile-productsale">
                                                    <p style={{ color: 'green' }}>HOT</p>
                                                </td>
                                            }
                                            {/* category */}
                                            <td className="table-mobile-productdate">
                                                <p>{item.categoryProducts?.map(item => {
                                                    return (
                                                        <p key={item?.idCategoryNavigation?.idCategory} className="star-color star">{item?.idCategoryNavigation?.name}</p>
                                                    )
                                                })}</p>
                                            </td>
                                            {/* quantity */}
                                            <td className="table-mobile-productdate">
                                                <p>{item.quantity === "0" ? "SOLD" : item.quantity}</p>
                                            </td>
                                            <td className="table-mobile-productdate">
                                                <p>{item.createddate ? moment(item.createddate).format('L') : 'null'}</p>
                                            </td>
                                            <td className="star-rating">
                                                <div className="star-rating-list flex">
                                                    <p className={
                                                        item.rating > 0 ? "star-color star" : "star"
                                                    }>★</p>
                                                    <p className={
                                                        item.rating > 1 ? "star-color star" : "star"
                                                    }>★</p>
                                                    <p className={
                                                        item.rating > 2 ? "star-color star" : "star"
                                                    }>★</p>
                                                    <p className={
                                                        item.rating > 3 ? "star-color star" : "star"
                                                    }>★</p>
                                                    <p className={
                                                        item.rating > 4 ? "star-color star" : "star"
                                                    }>★</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="action-table flex">
                                                    <div
                                                        className="action-item flex-center-dashboard action-green"
                                                        onClick={() => props.setOpenEditFunc(item, item.idProduct)}
                                                        id={item.idProduct}
                                                    >
                                                        <FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={faPencilAlt} />
                                                    </div>
                                                    <div
                                                        className="action-item flex-center-dashboard action-red"
                                                        onClick={deleteOnClick}
                                                        id={item.idProduct}
                                                    >
                                                        <FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={faTimes} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                    <div className="pagination-container flex" style={{ justifyContent: 'flex-end', margin: '20px 0' }}>
                        <div className="pagnigation flex-center-dashboard" onClick={choosePage}>
                            <div id="-1" className={classNames({
                                pagnigation_disable: currentPage === 1
                            })}>←</div>
                            {pages.map(function (number, index) {
                                if (currentPage === number) {
                                    return (
                                        <div key={number} id={number} className="pagnigation-active">
                                            {number}
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div
                                            key={number}
                                            id={number}
                                        >
                                            {number}
                                        </div>
                                    )
                                }
                            })}
                            <div id="999" className={classNames({
                                pagnigation_disable: currentPage === pageNumbers.length
                            })}>→</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}