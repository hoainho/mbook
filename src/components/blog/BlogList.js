import React from 'react'
import { Row } from 'antd'
import BlogItem from './BlogItem';
export default function BlogList(props) {
    const { posters } = props;
    let postersEmpty = []
    let isPoster = posters ? posters : postersEmpty
    return (
        <Row gutter={[16, 16]} className="blog__container-main-posterList">
            {isPoster?.map((poster, key) => {
                return <BlogItem poster={poster} key={key} />
            })}
        </Row>
    )
}
