import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import FilterStore from '../../components/store/FilterStore';
import BodyStore from '../../components/store/BodyStore';
import { Checkbox } from 'antd';

export default function ScreenStore() {
    const [gridTab, setGridTab] = useState(0)
    const [filterHotSale, setFilterHotSale] = useState("all");
    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleGridTabParent = (number) => {
        setGridTab(number)
    }
    const handleFilterHotSale = (filter) => {
        setFilterHotSale(filter)
    }
    return (
        <div className='container-wrapper'>
            <div className='stores'>
                <FilterStore gridTab={gridTab} handleGridTabParent={handleGridTabParent} handleFilterHotSale={handleFilterHotSale} />
                <BodyStore filterHotSale={filterHotSale} gridTab={gridTab} />
            </div>
            <Footer />
        </div>
    )
}
