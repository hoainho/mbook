import React, { useEffect, useState } from 'react';
import Notifications from 'react-notify-toast';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'antd/dist/antd.css';
import routes from './routes';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { cartReceived, discountReceived } from '../src/features/cart/CartSlice';
import requestAPI from '../src/api/index';
function App(props) {

  const dispatch = useDispatch()
  const account = useSelector(state => state.account)
  useEffect(() => {
    requestAPI(`/cart/load`, 'GET', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
      .then(res => {
        if (res) {
          console.log({
            Mycart: res.data
          });
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
    requestAPI(`/discount`, 'GET', null, { Authorization: `Bearer ${localStorage.getItem('TOKEN')}` })
      .then(res => {
        if (res) {
          dispatch(discountReceived(res.data));
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
  }, [account]);
  const [social, setSocial] = useState(false);
  const handleStatusSocial = (status) => {
    setSocial(status);
  }
  function showContentMenu(routes) {
    var result = null
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        )
      })
    }
    return result
  }
  console.log(social);
  return (
    <Router>
      <Notifications />
      <Header handleStatusSocial={handleStatusSocial} />
      <Navbar statusSocial={social} />
      <Switch>
        {showContentMenu(routes)}
      </Switch>
      <ScrollToTop />
    </Router>
  );
}

export default App;
