import React, {useEffect, useState} from 'react'
import classnames from 'classname';
export default function ScrollToTop() {
    const [active, setActive] = useState(false)
    const handleScroll = () => {
        window.scrollTo(0,0);
        // document.querySelector('html body').scrollTop = 0;
    }
    const onScroll = () => {
        if(window.pageYOffset > 1000){
            setActive(true)
        } else{
            setActive(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
    }, [])

    console.log({active});
    return (
        <div className={classnames('scrollToTop', {'scrollToTop--active': active})} onClick={handleScroll} id='scrollToTop'>
            <span><i class="fa fa-chevron-up" aria-hidden="true"></i></span>
        </div>  
    )
}
