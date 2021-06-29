import { faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DashboardProductTable from './DashboardOrderTable'

export default function DashboardOrder(props) {

    const [table, setTable] = useState([])

    useEffect(() => {
        if (window.innerWidth <= 600) {
            setTable([
                "Mã Đơn Hàng",
                "Địa Chỉ",
                "Số Điện Thoại",
                "Ngày tạo",
                "Số Lượng",
                "Tiền Ship",
                "Tổng Tiền",
                "PTTT",
                "Chức Năng"
            ])
        } else {
            setTable([
                "Mã Đơn Hàng",
                "Địa Chỉ",
                "Số Điện Thoại",
                "Ngày tạo",
                "Số Lượng",
                "Tiền Ship",
                "Tổng Tiền",
                "PTTT",
                "Chức Năng"
            ])
        }
        function handleResize() {
            if (window.innerWidth <= 600) {
                setTable([
                    "Mã Đơn Hàng",
                    "Địa Chỉ",
                    "Số Điện Thoại",
                    "Ngày tạo",
                    "Số Lượng",
                    "Tiền Ship",
                    "Tổng Tiền",
                    "PTTT",
                    "Chức Năng"
                ])
            } else {
                setTable([
                    "Mã Đơn Hàng",
                    "Địa Chỉ",
                    "Số Điện Thoại",
                    "Ngày tạo",
                    "Số Lượng",
                    "Tiền Ship",
                    "Tổng Tiền",
                    "PTTT",
                    "Chức Năng"
                ])
            }
        }
        window.addEventListener("resize", handleResize);
        return (() => {
            window.removeEventListener("resize", handleResize);
        })
    }, [])


    return (
        <div className="dashboard-product">
            <DashboardProductTable
                icon={faUser}
                title="Đơn Hàng"
                color="orange"
                table={table}
                setOpenCreateFunc={props.setOpenCreateFunc}
                setCloseCreateFunc={props.setCloseCreateFunc}
                setOpenEditFunc={props.setOpenEditFunc}
                setCloseEditFunc={props.setCloseEditFunc}
                isChange={props.isChange}
            />
        </div>
    )
}