import { React, useState, useEffect } from 'react'
import BodyStoreItem from './BodyStoreItem';
import { Row } from 'antd'
import requestAPI from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { productReceived } from '../../features/product/productSlice';
export default function BodyStore(props) {
    let { gridTab } = props;
    const [update, setUpdate] = useState(false)
    const [productList, setProductList] = useState([])
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    useEffect(() => {
        requestAPI('/product', 'GET')
            .then(res => {
                if (res) {
                    setProductList(res.data)
                    dispatch(productReceived(res.data))
                }
            })
            .catch(err => {
                console.log("GET ERROR:  ", err);
            })
    }, [update])
    return (
        <div className='bodyStore'>
            <Row gutter={[]}>
                {products.productFilter.map(item => {
                    return (
                        <BodyStoreItem book={item} key={item.id} gridTab={gridTab} />
                    )
                })}
            </Row>
        </div >

    )
}
