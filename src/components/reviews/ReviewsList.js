import React from 'react'

export default function ReviewsList(props) {
    const book1 = props.book1
    const book2 = props.book2
    const book3 = props.book3
    const book4 = props.book4
    const Row = props.Row
    const ReviewItems = props.ReviewItems

    return (
        <Row gutter={[16, 16]}>
            <ReviewItems book={book1} />
            <ReviewItems book={book2} />
            <ReviewItems book={book3} />
            <ReviewItems book={book4} />
            <ReviewItems book={book3} />
        </Row>
    )
}
