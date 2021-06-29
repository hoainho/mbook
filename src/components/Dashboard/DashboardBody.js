import React, { useEffect, useState } from 'react'
import './App.css'
import './Dashboard.css'
import DashboardHeader from './DashboardHeader'
import DashboardMain from './Main/DashboardMain';
import classNames from 'classnames'
import DashboardInbox from './Inbox/DashboardInbox';
import DashboardProduct from './Product/DashboardProduct';
import DashboardNews from './News/DashboardNews';
import DashboardProductEdit from './Product/DashboardProductEdit';
import DashboardProductCreate from './Product/DashboardProductCreate';
import Notification from 'react-notify-toast'
import DashboardNewsCreate from './News/DashboardNewsCreate';
import DashboardNewsEdit from './News/DashboardNewsEdit';
import DashboardUser from './User/DashboardUser';
import DashboardUserCreate from './User/DashboardUserCreate';
import DashboardUserEdit from './User/DashboardUserEdit';
import DashboardOrder from './Order/DashboardOrder';
import DashboardOrderEdit from './Order/DashboardOrderEdit';
import DashboardOrderCreate from './Order/DashboardOrderCreate';
import DashboardCollectionCreate from './Collection/DashboardCollectionCreate';
import DashboardCollectionEdit from './Collection/DashboardCollectionEdit';
import DashboardCollection from './Collection/DashboardCollection';
import DashboardSubscriberCreate from './Subscriber/DashboardSubscriberCreate';
import DashboardSubscriberEdit from './Subscriber/DashboardSubscriberEdit';
import DashboardSubscriber from './Subscriber/DashboardSubscriber';
import DashboardAuthorCreate from './Product/DashboardAuthorCreate';

export default function DashboardBody(props) {

    const tabId = props.tabId;
    const [toast, setToast] = useState(false)
    const [isChange, setIsChange] = useState(false)

    const setToastFunc = (bool) => {
        setIsChange(true)
        setTimeout(() => {
            setIsChange(false)
        }, 100)
        setToast(true)
        setTimeout(() => {
            setToast(false)
        }, 3000)
    }
    const openMenuMobile = props.openMenuMobile;
    return (
        <div className={classNames("DashboardBody", { DashboardBody_small: !props.openMenu })}>
            <Notification />
            {
                !openMenuMobile &&
                <div
                    className="DashboardBody-closemenu"
                    onClick={props.setOpenMenuOnClick}
                ></div>
            }
            { (props.openCreate && tabId === "3") &&
                <DashboardOrderCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openEdit && tabId === "3") &&
                <DashboardOrderEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openCreate && tabId === "4") &&
                <DashboardProductCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openEdit && tabId === "4") &&
                <DashboardProductEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openCreateAuthor && tabId === "4") &&
                <DashboardAuthorCreate
                    setCloseCreateAuthorFunc={props.setCloseCreateAuthorFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openEditAuthor && tabId === "4") &&
                <DashboardProductEdit
                    setCloseEditAuthorFunc={props.setCloseEditAuthorFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openCreate && tabId === "5") &&
                <DashboardNewsCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openEdit && tabId === "5") &&
                <DashboardNewsEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openCreate && tabId === "6") &&
                <DashboardUserCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openEdit && tabId === "6") &&
                <DashboardUserEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }

            { (props.openCreate && tabId === "7") &&
                <DashboardCollectionCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openEdit && tabId === "7") &&
                <DashboardCollectionEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }

            { (props.openCreate && tabId === "8") &&
                <DashboardSubscriberCreate
                    setCloseCreateFunc={props.setCloseCreateFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            { (props.openEdit && tabId === "8") &&
                <DashboardSubscriberEdit
                    setCloseEditFunc={props.setCloseEditFunc}
                    setToastFunc={setToastFunc}
                    openMenu={props.openMenu}
                />
            }
            <DashboardHeader
                itemName={props.menuItems[tabId - 1].name}
                setOpenMenuOnClick={props.setOpenMenuOnClick}
                openMenu={props.openMenu}
                orderNotice={props.orderNotice}
            />
            {
                tabId === "1" && <DashboardMain />
            }
            {
                tabId === "2" && <DashboardInbox />
            }
            {/* {
                tabId === "2" && 
                    <DashboardEmail
                        email={email}
                    />
            } */}
            {
                tabId === "3" &&
                <DashboardOrder
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "4" &&
                <DashboardProduct
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    setOpenCreateAuthorFunc={props.setOpenCreateAuthorFunc}
                    setOpenEditAuthorFunc={props.setOpenEditAuthorFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "5" &&
                <DashboardNews
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "6" &&
                <DashboardUser
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "7" &&
                <DashboardCollection
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
            {
                tabId === "8" &&
                <DashboardSubscriber
                    setOpenCreateFunc={props.setOpenCreateFunc}
                    setOpenEditFunc={props.setOpenEditFunc}
                    toast={toast}
                    isChange={isChange}
                />
            }
        </div>
    )
}