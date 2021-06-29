import React from 'react'
import SocialHeader from './SocialHeader'
import { Col } from 'antd';
import avatar from './avatar.jpg';
import avatar1 from './book2.jpg';
import avatar2 from './book3.jpg';
import avatar3 from './book4.jpg';
import SocialPost from './SocialPost';
import SocialUpload from './SocialUpload';
export default function SocialActivity() {
    return (
        <Col className="social__activity" xs={{ span: 12 }} md={{ span: 18 }} lg={{ span: 18 }}>
            <SocialUpload />
            <SocialHeader />
            <SocialPost avatar={avatar} />
            <SocialPost avatar={avatar1} />
            <SocialPost avatar={avatar2} />
            <SocialPost avatar={avatar3} />
        </Col>
    )
}
