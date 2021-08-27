import React, { useState, useEffect } from 'react'
import RangeSlider from './rangeSlider/RangeSlider';
import classname from 'classname';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../../features/product/productSlice';
import requestAPI from '../../api/index'
export default function FilterStore(props) {
    const [sortPriceValue, setSortPriceValue] = useState([])
    const [cate, setCate] = useState()
    const [author, setAuthor] = useState()
    const [filterActive, setFilterActive] = useState(false)
    const [filterTab, setFilterTab] = useState("0")
    const [activeTab, setActivedTab] = useState(0);
    const dispatch = useDispatch();
    // const { girdTab } = props
    useEffect(() => {
        requestAPI('/category', 'GET')
            .then(res => {
                if (res) {
                    setCate(res.data)
                    console.log({ cate: res.data });
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log('ERROR :' + err);
                }
            })
        requestAPI('/author', 'GET')
            .then(res => {
                if (res) {
                    setAuthor(res.data)
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log('ERROR :' + err);
                }
            })
    }, [])
    const handleFilterActive = () => {
        setFilterActive(!filterActive)
    }

    const handleFilterTab = (number) => {
        setFilterTab(number)
        dispatch(filter(number))
        console.log(number);
    }

    const handleGridTab = (number) => {
        props.handleGridTabParent(number)
        setActivedTab(number);
    }
    const onChangeFilterCate = (e) => {
        dispatch(filter({ type: "category", value: e.target.value }))
    }
    const onChangeFilterAuthor = (e) => {
        dispatch(filter({ type: "author", value: e.target.value }))
    }
    const onChangeFilterTag = (e) => {
        dispatch(filter(e.target.value))
    }
    const handleFilterPrice = (price) => {
        dispatch(filter({ type: "price", value: sortPriceValue }))
        console.log(price);
    }
    return (
        <div className='filterStore'>
            <div className='filterStore__tab'>
                <div className={classname('filterStore__tab-item', { 'filterStore__tab-item--active': filterTab === "0" })} onClick={() => handleFilterTab("0")}>All Books</div>
                <div className={classname('filterStore__tab-item', { 'filterStore__tab-item--active': filterTab === "1" })} onClick={() => handleFilterTab("1")}>Hot Books</div>
                <div className={classname('filterStore__tab-item', { 'filterStore__tab-item--active': filterTab === "2" })} onClick={() => handleFilterTab("2")}>Sales Books</div>
            </div>
            <div className='filterStore__tabMobie'>
                <select className='filterStore__tabMobie-select'>
                    <option>All Books</option>
                    <option >Hot Books</option>
                    <option >Sales Books</option>
                </select>
            </div>
            <div className='filterStore__options'>
                <div className='filterStore__options-grid'>
                    <div onClick={() => handleGridTab(1)}><i className={classname("fa fa-th", { 'filterStore__options-grid-actived': activeTab })} aria-hidden="true"></i></div>
                    <div onClick={() => handleGridTab(0)}><i className={classname("fa fa-th-large", { 'filterStore__options-grid-actived': !activeTab })} aria-hidden="true"></i></div>
                </div>
                <div className='filterStore__options-filter'>
                    <div className='filterStore__options-filter-icon' onClick={handleFilterActive} ><i class="fa fa-filter" aria-hidden="true"></i>Filter</div>
                    <div className={classname('filterStore__options-filter-sub', { 'filterStore__options-filter-sub--active': filterActive })}>
                        <div className='filterStore__options-filter-sub-header'>
                            <p>Filter</p>
                            <i class="fa fa-times" aria-hidden="true" onClick={handleFilterActive} ></i>
                        </div>
                        <div className='filterStore__options-filter-sub-categories'>
                            <select className='filterStore__tabMobie-select' onChange={onChangeFilterCate} >
                                <option value="all">Tất Cả Thể Loại </option>
                                {cate?.map((item) => {
                                    return (<option option key={item.id} value={item.name} > {item.name}</option>)

                                })}
                                {/* <option value="tinhcam" >Tình Cảm</option>
                                <option value="tamli">Tâm lí</option> */}
                            </select>
                        </div>
                        <div className='filterStore__options-filter-sub-categories'>
                            <select className='filterStore__tabMobie-select' onChange={onChangeFilterAuthor}>
                                <option >Tất Cả Tác Giả </option>
                                {author?.map((item) => {
                                    return (<option option key={item.id} value={item.name} > {item.name}</option>)

                                })}
                            </select>
                        </div>
                        <div className='filterStore__options-filter-sub-categories'>
                            <select className='filterStore__tabMobie-select' onChange={onChangeFilterTag}>
                                <option value={0}>Tất Cả Tag </option>
                                <option value={1} >Hot</option>
                                <option value={2}>Sale</option>
                            </select>
                        </div>
                        <div className='filterStore__options-filter-sub-price'>
                            <span>Price</span>
                            <RangeSlider
                                setSortPriceValue={setSortPriceValue}
                            />
                        </div>
                        <div className='filterStore__options-filter-sub-btn' onClick={() => handleFilterPrice(sortPriceValue)}>
                            <span>Filter Price</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
