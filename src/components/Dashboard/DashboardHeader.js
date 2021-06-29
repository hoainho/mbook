import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { faBell, faEllipsisV, faListUl, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'

export default function DashboardHeader(props) {

    const [openNotice, setOpenNotice] = useState(null)
    const [notice, setNotice] = useState(null)
    const [unreadedNotice, setUnreadedNotice] = useState(0)

    useEffect(() => {

    }, [props.orderNotice])

    const readNotice = () => {

    }
    const openMenuOnClick = () => {
        props.setOpenMenuOnClick()
    }

    return (
        <div className="dashboard-header flex">
            <div className="flex-center-dashboard">
                <div className="menu-opt flex-center-dashboard"
                    onClick={openMenuOnClick}>
                    {props.openMenu && <FontAwesomeIcon icon={faEllipsisV} />}
                    {props.openMenu === false && <FontAwesomeIcon icon={faListUl} />}
                </div>
                <p>{props.itemName}</p>
            </div>
            <div className="flex-center-dashboard menu-search-container">
                <form className="menu-search flex">
                    <input type="text" placeholder="Search..." className="menu-search-input"></input>
                    <div className="flex-center-dashboard">
                        <FontAwesomeIcon icon={faSearch} className="icon" />
                    </div>
                </form>
                <div
                    className="menu-notice noselect"
                    onClick={readNotice}
                >
                    <FontAwesomeIcon icon={faBell} style={{ pointerEvents: 'none' }} className="icon" />
                    {unreadedNotice > 0 &&
                        <div className="notice-count">{unreadedNotice}</div>
                    }
                    {openNotice &&
                        <div className="notice-box">
                            {notice &&
                                notice.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="notice-item"
                                        >
                                            {item.noticeContent}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}