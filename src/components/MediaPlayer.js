import React, { useState } from 'react'
import classnames from 'classname';
import audio from './audio.mp3'
export default function MediaPlayer() {
    const [play, setPlay] = useState(false)
    const handlePlay = () => {
        setPlay(!play);
    }
    return (
        <div className="mediaPlayer">
            <section className="implementation">

                {/* <div className="now-playing-board-bottom-bar" id="now-playing-board-bottom-bar-id">
                </div> */}
                <div className="play-controls">
                    <img src="https://pngimg.com/uploads/vinyl/vinyl_PNG21.png" width={70} height={70} id="vynl-id" className="vynl" alt='imgg' />
                    <div className="play-buttons">
                        <i class="fa fa-step-backward" aria-hidden="true"></i>
                        <div className="play-circle" id="playpause" onClick={handlePlay} />
                        <i class="fa fa-step-forward" aria-hidden="true"></i>
                    </div>
                </div>
                <audio id="audioSrc">
                    <source src={audio} type="audio/mp3" />
                </audio>
            </section>
            {/* <div className={classnames('mediaPlayer__banner', { ' mediaPlayer__banner--active': play })}>
                <div className='mediaPlayer__banner-main'>
                    <div  className='mediaPlayer__banner-main-img'>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
