import classname from 'classname';
import React from 'react'
import {
  Route,
  Link,
} from "react-router-dom";
import MediaPlayer from '../MediaPlayer';
const MenuLink = ({ label, to, activeOnlyWhenExact, icon }) => {
  return (
    <Route
      path={to} exact={activeOnlyWhenExact} children={({ match }) => {
        var active = match ? 'navbar__list navbar--active' : 'navbar__list'
        return (
          <li className={active}>
            <Link className="link" to={to} >
              {label}</Link>
            <span className="navbar__icon">
              <i class={`fa fa-${icon} navbar__icon-item `} aria-hidden="true"></i>
            </span>
          </li>
        )
      }}
    />
  )
}
export default function Navbar(props) {
  return (

    <div className="navbar">
      <ul>
        <MenuLink label='Trang Chủ' icon="home" to='/' activeOnlyWhenExact={true} />
        <MenuLink label='Cửa Hàng' icon="store" to='/stores' activeOnlyWhenExact={false} />
        <MenuLink label='Blog Sách' icon="swatchbook" to='/blog' activeOnlyWhenExact={false} />
        <MenuLink label='Review Sách' icon="star-of-david" to='/reviews' activeOnlyWhenExact={false} />
        <MenuLink label='Mạng Xã Hội' icon="connectdevelop" to='/social' activeOnlyWhenExact={false} />
      </ul>
      <MediaPlayer />

    </div>
  )
}
