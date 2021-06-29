import React, { useState } from 'react'

export default function BlogComment(props) {
    const { avatar, id } = props
    const [value, setValue] = useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    }
    return (
        <div className="action__interface-creative-comment">
            <div className="action__interface-creative-comment-avatar">
                <img className="action__interface-creative-comment-avatar-image" src={avatar} />
            </div>
            <div className="action__interface-creative-comment-container">
                <input id={id} className="action__interface-creative-comment-container-input" type="text" value={value} placeholder="Nhập bình luận" onChange={handleChange} />
                <div className="action__interface-creative-comment-container-control" >
                    <span className="action__interface-creative-comment-container-control-icon">
                        <i class="fa fa-smile-o" aria-hidden="true"></i>
                    </span>
                    <span className="action__interface-creative-comment-container-control-icon">
                        <i class="fa fa-picture-o" aria-hidden="true"></i>
                    </span>
                    <span className="action__interface-creative-comment-container-control-icon">
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        </div>

    )
}
