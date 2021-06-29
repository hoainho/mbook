import React from 'react'

export default function ButtonCustom(props) {
    const { nameButton, icon } = props;
    return (
        <div className="buttons">
            <button className="blob-btn">
                <i className={`fa fa-${icon}`} aria-hidden="true"></i>
                {nameButton}
                <span className="blob-btn__inner">
                    <span className="blob-btn__blobs">
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                        <span className="blob-btn__blob"></span>
                    </span>
                </span>
            </button>
            <br />
        </div>
    )
}
