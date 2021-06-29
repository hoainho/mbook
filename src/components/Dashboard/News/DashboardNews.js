import { faPager } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import DashboardProductTable from './DashboardNewsTable'

export default function DashboardNews(props) {

    const table = [
        "Title",
        "Sub",
        "Content",
        "Category",
        "Date",
        "Author",
        "Likes",
        "Action"
    ]

    return (
        <div className="dashboard-product">
            <DashboardProductTable
                icon={faPager}
                title="Bài Viết"
                color="green"
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