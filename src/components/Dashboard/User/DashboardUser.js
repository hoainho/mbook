import { faUser } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import DashboardProductTable from './DashboardUserTable'
export default function DashboardUser(props) {

    const table = [
        "Id",
        "Fullname",
        "Username",
        "Password",
        "Role",
        "Status",
        "Action"
    ]

    return (
        <div className="dashboard-product">
            <DashboardProductTable
                icon={faUser}
                title="User"
                color="lightblue"
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