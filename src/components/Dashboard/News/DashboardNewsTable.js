import React, { useEffect, useState } from 'react'
import '../App.css'
import '../Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames'
import requestAPI from '../../../api/index'
import moment from 'moment'
import notificationCustom from '../../../notification/index';
import { useDispatch } from 'react-redux';
import { viewDetails } from '../../../features/poster/posterSlice'

export default function DashboardNewsTable(props) {
    const [status, setStatus] = useState(false)
    const dispatch = useDispatch();

    const [news, setNews] = useState([])
    const [isSortByTitle, setIsSortByTitle] = useState(false)
    const [isSortByView, setIsSortByView] = useState(false)
    const [constNews, setConstNews] = useState([])

    useEffect(() => {
        requestAPI(`/poster`, 'GET')
            .then(res => {
                console.log(res.data);
                setNews(res.data)
                setConstNews(res.data)
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
    const current = news.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(news.length / itemsPerPage); i++) {
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
    const deletePoster = (id) => {
        requestAPI(`/poster/${id}`, 'DELETE', id, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
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
                        notificationCustom("Nhắc Nhở", `Vui lòng nhập thông tin theo đúng yêu cầu`, "warning")
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
            for (let i in constNews) {
                if ((constNews[i].title).toLowerCase().includes(searchInput.toLowerCase())) {
                    search.push(constNews[i])
                }
            }
            setNews(search)
        } else {
            setNews(constNews)
        }
    }

    const sortTable = (event) => {
        if (event.target.id === "Title") {
            if (isSortByTitle) {
                const sortByTitle = [...news]
                sortByTitle.sort(function (a, b) {
                    var titleA = a.newTitle.toLowerCase();
                    var titleB = b.newTitle.toLowerCase();
                    if (titleA === titleB) return 0;
                    return titleA > titleB ? 1 : -1;
                })
                setIsSortByTitle(false)
                setNews(sortByTitle)
            } else {
                const sortByTitle = [...news]
                sortByTitle.sort(function (a, b) {
                    var titleA = a.newTitle.toLowerCase();
                    var titleB = b.newTitle.toLowerCase();
                    if (titleA === titleB) return 0;
                    return titleA < titleB ? 1 : -1;
                })
                setIsSortByTitle(true)
                setNews(sortByTitle)
            }
        }
        if (event.target.id === "Views") {
            if (isSortByView) {
                const sortByView = [...news]
                sortByView.sort(function (a, b) {
                    var ViewA = a.newView;
                    var ViewB = b.newView;
                    if (ViewA === ViewB) return 0;
                    return ViewA > ViewB ? 1 : -1;
                })
                setIsSortByView(false)
                setNews(sortByView)
            } else {
                const sortByView = [...news]
                sortByView.sort(function (a, b) {
                    var ViewA = a.newView;
                    var ViewB = b.newView;
                    if (ViewA === ViewB) return 0;
                    return ViewA < ViewB ? 1 : -1;
                })
                setIsSortByView(true)
                setNews(sortByView)
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
                                                onClick={(event) => { sortTable(event) }}
                                                id={item}
                                            >
                                                {item}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                            {
                                current?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td >
                                                <p >{item?.title}</p>
                                            </td>
                                            <td>
                                                <p style={{}}>{item?.sub}</p>
                                            </td>
                                            <td className="table-mobile-newscontent"
                                                style={{
                                                    margin: '10px 0px',
                                                    WebkitLineClamp: '3',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden'
                                                }}
                                                dangerouslySetInnerHTML={{ __html: item?.description }}
                                            >
                                            </td>
                                            <td className="table-mobile-newscate">
                                                {item.categoryPosters?.map(item => {
                                                    return (
                                                        <p key={item.idCategory} style={{ color: 'orange' }}>{item?.idCategoryNavigation?.name}</p>
                                                    )
                                                })}
                                            </td>
                                            <td className="table-mobile-newsdate">
                                                <p>{item.createddate ? moment(item.createddate).format('L') : 'null'}</p>
                                            </td>
                                            <td className="table-mobile-newsview">
                                                <p style={{ color: '#5374B9' }}>By {item?.createdby}</p>
                                            </td>
                                            <td className="table-mobile-newsview">
                                                <p style={{ color: 'green' }}>{item?.listLikes?.length} like</p>
                                            </td>
                                            <td>
                                                <div className="action-table flex">
                                                    <div
                                                        className="action-item flex-center-dashboard action-green"
                                                        onClick={() => getDetails(item, item.idPoster)}
                                                        id={item.idPoster}
                                                    >
                                                        <FontAwesomeIcon style={{ pointerEvents: 'none' }} icon={faPencilAlt} />
                                                    </div>
                                                    <div
                                                        className="action-item flex-center-dashboard action-red"
                                                        onClick={() => deletePoster(item.idPoster)}
                                                        id={item.idPoster}
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