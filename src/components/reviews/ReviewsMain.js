import React from 'react'
import ReviewsList from './ReviewsList'

export default function ReviewsMain(props) {
    const book1 = props.book1
    const book2 = props.book2
    const book3 = props.book3
    const book4 = props.book4
    const Row = props.Row
    const Col = props.Col
    const ReviewItems = props.ReviewItems
    const Pagination = props.Pagination

    return (
        <Col className="blog__container-main" xs={{ span: 24 }} md={{ span: 16 }} lg={{ span: 18 }}>
            <ReviewsList
                Row={Row}
                ReviewItems={ReviewItems}
                book1={book1}
                book2={book2}
                book3={book3}
                book4={book4}
            />

            {/* Phân Trang */}
            <Pagination className="blog__container-main-pagination" size="small" total={500} showQuickJumper />
        </Col>

    )
}
