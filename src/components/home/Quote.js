import React from 'react'

export default function Quote() {
    return (
        <div className='quote' style={{backgroundImage:'url(https://skybook.woovina.net/demo-01/wp-content/uploads/2020/05/bg_testimonial1.jpg)'}}>
            <div className='quote__icon'>
                <i class="fa fa-quote-right" aria-hidden="true"></i>
            </div>
            <div className='quote__content'>
                <p> Cras consequat orci in accumsan hendrerit. Vivamus tempor aliquam eros non condimentum. Sed sed felis fringilla, gravida felis nec, pellentesque sapien.</p>
            </div>
            <div className='quote__author'>
                <span>Verner Arieh</span> 
            </div>
        </div>
    )
}
