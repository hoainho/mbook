import React from 'react'
import PageNotFound from './components/PageNotFound';
import ScreenHome from './screens/home/ScreenHome';
import ScreenStore from './screens/store/ScreenStore';
import ItemDetails from './components/store/ItemDetails';
import Author from './components/store/Author';
import Blog from './components/blog/BlogMain';
import BlogDetails from './components/blog/BlogDetails_Fix';
import Cart from './components/store/Cart';
import Review from './components/reviews/Review';
import ReviewDetails from './components/reviews/ReviewDetails';
import ScreenSocial from './screens/social/ScreenSocial';
import Dashboard from './components/Dashboard/Dashboard';
import RSA from './screens/RSA/index';
import Text from './screens/RSA/text';
const routes = [
    {
        path: '/',
        exact: true,
        main: () => <ScreenHome />
    },

    {
        path: '/stores',
        exact: true,
        main: () => <ScreenStore />
    },
    {
        path: '/details/:id',
        exact: true,
        main: () => <ItemDetails />
    },
    {
        path: '/author/:id',
        exact: true,
        main: () => <Author />
    },
    {
        path: '/blog',
        exact: true,
        main: () => <Blog />
    },
    {
        path: '/blogDetails/:id',
        exact: true,
        main: () => <BlogDetails />
    },
    {
        path: '/cart',
        exact: true,
        main: () => <Cart />
    },
    {
        path: '/reviews',
        exact: true,
        main: () => <Review />
    },
    {
        path: '/reviewsDetails',
        exact: true,
        main: () => <ReviewDetails />
    },
    {
        path: '/social',
        exact: true,
        main: () => <ScreenSocial />
    },
    {
        path: '/admin/dashboard',
        exact: true,
        main: () => <Dashboard />
    },
    {
        path: '/RSA',
        exact: true,
        main: () => <RSA />
    },
    {
        path: '/RSAText',
        exact: true,
        main: () => <Text />
    },
    {
        path: '',
        exact: true,
        main: () => <PageNotFound />
    },

]
export default routes