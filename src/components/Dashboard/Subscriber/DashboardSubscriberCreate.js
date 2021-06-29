import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export default function DashboardSubscriberCreate(props) {

    const createForm = useRef();

    const [subscriberEmail, setSubscriberEmail] = useState("")

    const onSubmit = (event) => {
        event.preventDefault()

    }
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
                        Subcriber infomation
                    </div>
                    <div
                        className="create-box-title-close flex-center-dashboard"
                        onClick={() => {
                            props.setCloseCreateFunc(false);
                        }}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <form onSubmit={onSubmit} encType="multipart/form-data" ref={createForm}>
                    <div className="create-box-row flex">
                        <div className="dashboard-left flex">Email</div>
                        <div className="dashboard-right">
                            <input
                                type="text" name="email"
                                value={subscriberEmail || ""}
                                onChange={(event) => {
                                    setSubscriberEmail(event.target.value)
                                }} required
                            ></input>
                        </div>
                    </div>
                    <div className="flex-center-dashboard" style={{ marginTop: '40px' }}>
                        <button className="create-box-btn btn">
                            Create subcriber
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}