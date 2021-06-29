import React, { useEffect } from 'react'
import { Row } from 'antd';
import SocialActivity from '../../components/social/SocialActivity';
import SocialAside from '../../components/social/SocialAside';
export default function ScreenSocial() {
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <div className="container-wrapper">
            <Row gutter={[16, 16]}>
                <SocialActivity />
                <SocialAside />
            </Row>
        </div>
    )
}
