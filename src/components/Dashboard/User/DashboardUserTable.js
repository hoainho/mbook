import React, { useEffect, useState } from 'react'
import '../App.css'
import '../Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames'
import requestAPI from '../../../api/index'
import { viewDetails } from '../../../features/account/accountSlice';
import { useDispatch } from 'react-redux';
import notificationCustom from '../../../notification/index';

export default function DashboardUserTable(props) {
    const [status, setStatus] = useState(false)
    const [user, setUser] = useState([])
    const [isSortByName, setIsSortByName] = useState(false)
    const [constUser, setConstUser] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        requestAPI(`/account/getaccounts`, 'GET', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                console.log({ account: res.data });
                setUser(res.data)
                setConstUser(res.data)
            })
            .catch(err => {
                console.log("Faild from server : ", err);
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
    const current = user.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(user.length / itemsPerPage); i++) {
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

    const deleteAccount = (id) => {
        requestAPI(`/account/DeleteAccount/${id}`, 'DELETE', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    notificationCustom("Thông Báo", `Xóa thành công  `, "success")
                    setStatus(!status)
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        notificationCustom("Nhắc Nhở", `Bạn không đủ quyền `, "warning")
                    }
                    if (err.response.status === 500) {
                        notificationCustom("Nhắc Nhở", `Tài Khoản Này Đang Có Sản Phẩm Trong Giỏ Hàng, Bạn Chắc Chắn Muốn Xóa ?
                         \n (Nếu Muốn Xóa Bạn Có Thể Xóa Giỏ Hàng Của Người Này || Hoặc Vô Hiệu Hóa !)
                         `, "danger")
                    }
                }
            })
    }

    const searchOnSubmit = (event) => {
        event.preventDefault()
    }
    const searchOnChange = (event) => {
        const searchInput = event.target.value
        if (searchInput !== '') {
            const search = []
            for (let i in user) {
                if ((user[i].id).toLowerCase().includes(searchInput.toLowerCase())) {
                    search.push(user[i])
                }
            }
            setUser(search)
        } else {
            setUser(constUser)
        }
    }

    const sortTable = (event) => {
        if (event.target.id === "UserName") {
            if (isSortByName) {
                const sortByName = [...user]
                sortByName.sort(function (a, b) {
                    var userA = a.userName.toLowerCase();
                    var userB = b.userName.toLowerCase();
                    if (userA === userB) return 0;
                    return userA > userB ? 1 : -1;
                })
                setIsSortByName(false)
                setUser(sortByName)
            } else {
                const sortByName = [...user]
                sortByName.sort(function (a, b) {
                    var userA = a.userName.toLowerCase();
                    var userB = b.userName.toLowerCase();
                    if (userA === userB) return 0;
                    return userA < userB ? 1 : -1;
                })
                setIsSortByName(true)
                setUser(sortByName)
            }
        }
    }

    const getDetails = (item, id) => {
        props.setOpenEditFunc(item)
        dispatch(viewDetails(id))
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
                        >Add new</div>
                        <div className="dashboard-addnew-search">
                            <form
                                onSubmit={searchOnSubmit}
                            >
                                <input type="text" placeholder="Search records"
                                    onChange={searchOnChange}
                                ></input>
                            </form>
                        </div>
                    </div>
                    <table className="dashboard-table" style={{ tableLayout: 'fixed' }}>
                        <tbody>
                            <tr>
                                {
                                    props.table.map((item, index) => {
                                        return (
                                            <th
                                                key={index} className="table-new-title"
                                                onClick={(event) => {
                                                    sortTable(event)
                                                }}
                                                id={`User${item}`}
                                            >
                                                {item}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                            {
                                current.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            {/* <td style={{ display: 'flex' }}>
                                                <img
                                                    className="table-mobile-useravt"
                                                    src={item?.id}
                                                    width="70px" height="80px"
                                                    style={{ padding: '5px 0', borderRadius: '50%' }}
                                                    alt=""
                                                />
                                            </td> */}
                                            <td>
                                                <p width="20%" height="80px" style={{ padding: '5px 0', borderRadius: '50%' }}>#{item.idAccount} </p>
                                            </td>
                                            <td>
                                                <p>{item.fullname}</p>
                                            </td>
                                            <td className="table-mobile-useremail">
                                                <p>{item.username}</p>
                                            </td>
                                            <td className="table-mobile-userphone">
                                                <p>{item.password}</p>
                                            </td>
                                            <td className="table-mobile-useraddress">
                                                <p>{item.roleid === true ? 'admin' : 'user'}</p>
                                            </td>
                                            <td className="table-mobile-useraddress">
                                                <p>{item.status === false ? 'Kích hoạt' : 'Vô hiệu hóa'}</p>
                                            </td>
                                            <td>
                                                <div className="action-table flex">
                                                    <div
                                                        className="action-item flex-center-dashboard action-green"
                                                        onClick={() => getDetails(item, item.id)}
                                                    >
                                                        <FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={faPencilAlt} />
                                                    </div>
                                                    <div
                                                        className="action-item flex-center-dashboard action-red"
                                                        onClick={() => deleteAccount(item.idAccount)}
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