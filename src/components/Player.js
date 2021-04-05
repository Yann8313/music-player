import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay,faPause, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
    //Ref
    const audioRef = useRef(null);
    // Event Handlers
    const playSongHandler = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    }
    const timeUpdateHandler = (event) => {
        const current = event.target.currentTime;
        const duration = event.target.duration;
        setSongInfo({...songInfo,currentTime: current, duration: duration})

    }
    const formatTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )

    }
    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongInfo({...songInfo,currentTime: event.target.value})

    }
    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    })

    return (
        <div className="player">
            <div className="time-control">
                <p>{formatTime((songInfo.currentTime))}</p>
                <input onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime}
                       type="range"/>
                <p>{formatTime(songInfo.duration)}</p>

            </div>
            <div className="play-control">
                <FontAwesomeIcon className='skip-back' size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon className='skip-forward' size="2x" icon={faAngleRight}/>
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef}
    src={currentSong.audio}/>
        </div>
    )
}

export default Player;