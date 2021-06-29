import React from 'react'
import classnames from 'classnames';

export default function NavbarMobile(props) {
    const openSidebar = props.openSidebar
    const isSidebarOpen = props.isSidebarOpen
    const darkMode = props.darkMode
    const logoDark = props.logoDark
    const logoLight = props.logoLight
    const FaTimes = props.FaTimes
    const links = props.links
    const social = props.social
    const toggleTheme = props.toggleTheme
    return (
        <div className='header__menuMobie'>
            <i class="fa fa-bars" aria-hidden="true" onClick={openSidebar}></i>
            <div className={classnames('header__menuMobie-wrap', { 'header__menuMobie-wrap--show': isSidebarOpen })}>
                <div className='header__menuMobie-wrap-img'>
                    {
                        darkMode ? <img src={logoDark} alt='logo' /> : <img src={logoLight} alt='logo' />
                    }
                    <div className='close-btn' onClick={openSidebar}>
                        <FaTimes />
                    </div>
                </div>
                <ul className='header__menuMobie-wrap-links'>
                    {links.map((link) => {
                        const { id, url, text, icon } = link;
                        return (
                            <li key={id}>
                                <a href={url}>
                                    {icon}
                                    {text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <div className='header__menuMobie-wrap-control'>
                    <ul className='header__menuMobie-wrap-socialIcons'>
                        {social.map((link) => {
                            const { id, url, icon } = link;
                            return (
                                <li key={id}>
                                    <a href={url}>{icon}</a>
                                </li>
                            );
                        })}

                    </ul>
                    <div className={classnames('header__search-darkTheme', { 'header__search-darkTheme--darkMode': darkMode })}>
                        <input type="checkbox" id="custom-toggle" onClick={toggleTheme} hidden />
                        <label htmlFor="custom-toggle">
                            <span className="header__search-darkTheme-btn"><i class="fa fa-moon-o" aria-hidden="true"></i></span>
                        </label>
                    </div>
                </div>

            </div>
            <div className={classnames('header__menuMobie-background', { 'header__menuMobie-background--show': isSidebarOpen })} onClick={openSidebar}>
            </div>
        </div>

    )
}
