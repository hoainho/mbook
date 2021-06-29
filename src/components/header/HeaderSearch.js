import React from 'react'
import classnames from 'classnames';
import { Link } from 'react-router-dom'

export default function HeaderSearch(props) {
    const darkMode = props.darkMode
    const toggleTheme = props.toggleTheme
    const handleSocial = props.handleSocial
    return (
        <div className='header__search'>
            <div className='header__search-main'>
                <div className='header__search-main-btn'>
                    <i class="fa fa-search" aria-hidden="true"></i>
                </div>
                <input type="text" className="header__search-main-input" placeholder='Search...' />
            </div>
            <div className={classnames('header__search-darkTheme', { 'header__search-darkTheme--darkMode': darkMode })}>
                <input type="checkbox" id="custom-toggle" onClick={toggleTheme} hidden />
                <label htmlFor="custom-toggle">
                    <span className="header__search-darkTheme-btn"><i class="fa fa-moon-o" aria-hidden="true"></i></span>
                </label>
            </div>
            <div className="header__social">
                <Link className="header__social-wrapper" to="/social" onClick={() => handleSocial(true)}>
                    <span className="header__social-wrapper-btn"><i class="fa fa-connectdevelop" aria-hidden="true"></i></span>
                </Link>
            </div>
        </div>

    )
}
