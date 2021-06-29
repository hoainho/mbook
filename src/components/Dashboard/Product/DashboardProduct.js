import { faTshirt } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import DashboardProductTable from './DashboardProductTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function DashboardProduct(props) {

    return (
        <div className="dashboard-product">
            <DashboardProductTable
                icon={faTshirt}
                title="Products"
                color="pink"
                setOpenCreateFunc={props.setOpenCreateFunc}
                setCloseCreateFunc={props.setCloseCreateFunc}
                setOpenCreateAuthorFunc={props.setOpenCreateAuthorFunc}
                setCloseCreateAuthorFunc={props.setCloseCreateAuthorFunc}
                setOpenEditFunc={props.setOpenEditFunc}
                setCloseEditFunc={props.setCloseEditFunc}
                setOpenEditAuthorFunc={props.setOpenEditAuthorFunc}
                setCloseEditAuthorFunc={props.setCloseEditAuthorFunc}
                isChange={props.isChange}
            />
        </div>
    )
}