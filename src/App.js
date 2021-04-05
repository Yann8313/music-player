import React, {useState} from 'react';
// import components
import Library from "./components/Library";
import Player from "./components/Player";
import Song from "./components/Song";
// import Styles
import "./styles/App.scss"
// Import datas songs
import data from "./util";

function App() {
    //State
    const[songs,setSongs] = useState(data());
    const [currentSong,setCurrentSong] = useState(songs[4])
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <Song currentSong={currentSong}/>
            <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
            <Library songs={songs} setCurrentSong={setCurrentSong} />
        </div>
    );
}

export default App;
