import React, { useState } from 'react'
import imgAfter from './Matsau.jpg'
import imgdetails from './Mattruoc.jpg'
export default function ItemDetailsImage(props) {
    const [rotate, setRotate] = useState(false);
    const [visible, setVisible] = useState(false);
    const handleRotate = () => {
        let newRotate = rotate
        newRotate = !rotate
        setRotate(newRotate);
    }
    const handleVisible = () => {
        setVisible(true);
        props.visible(visible);

    }
    return (
        <div className="details__image-container">
            <div className="details__image-wrapper">
                {/* first */}
                <div class="details__image-wrapper-page" id="first">
                    <div class="details__image-wrapper-back">
                        <div class="details__image-wrapper-outer">
                            <div class="details__image-wrapper-content">
                                <img src={imgdetails} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class={rotate ? "details__image-wrapper-page details__image-wrapper-page--nextRotate" : " details__image-wrapper-page details__image-wrapper-page--preRotate"} id="second">
                    <div class="details__image-wrapper-front">
                        <div class="details__image-wrapper-outer">
                            <div class="details__image-wrapper-content">
                                <img src={imgdetails} />
                            </div>
                        </div>
                    </div>
                    <div class="details__image-wrapper-back" id="third">
                        <div class="details__image-wrapper-outer">
                            <div class="details__image-wrapper-content">
                                <div class="details__image-wrapper-helper-class-to-make-bug-visbile">
                                    <img src={imgAfter} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details__image-wrapper-page" id="fourth">
                    <div class="details__image-wrapper-front">
                        <div class="details__image-wrapper-outer">
                            <div class="details__image-wrapper-content">
                                <img src={imgAfter} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="details__image-control">
                <div className="details__image-control-rotate" onClick={handleRotate}>
                    <span className="details__image-control-rotate-icon" >
                        <i class="fa fa-undo" aria-hidden="true"></i>
                    </span>
                    <span className="details__image-control-rotate-text">
                        Xoay
            </span>
                </div>
            </div>

        </div>
    )
}
