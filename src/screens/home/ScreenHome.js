import React, { useEffect } from 'react'
import BannerHome from '../../components/home/BannerHome'
import BannerV1 from '../../components/home/BannerV1'
import PopularBook from '../../components/home/PopularBook'
import PopularBlog from '../../components/home/PopularBlog'
import PopularAuthor from '../../components/home/PopularAuthor'
import Quote from '../../components/home/Quote';
import PopularReview from '../../components/home/PopularReview'
import requestAPI from '../../api/index';
import { useDispatch } from 'react-redux';
import { cartReceived } from '../../features/cart/CartSlice';
// import Home from '../../components/home/Home'
import Footer from '../../components/footer/Footer';
export default function ScreenHome() {
    const dispatch = useDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
        requestAPI(`/cart/Load`, 'GET', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
            .then(res => {
                if (res) {
                    dispatch(cartReceived(res.data));
                }
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 403) {
                        console.log("TOKEN TIME OUT");
                    }
                    if (err.response.status === 500) {
                        console.log({ err });
                    }
                }
            })

    }, [])
    return (
        <div className='container-wrapper'>
            <BannerHome />
            <BannerV1 />
            <PopularBook />
            <PopularAuthor />
            <PopularBlog />
            <Quote />
            <PopularReview />
            <Footer />
        </div>
    )
}
