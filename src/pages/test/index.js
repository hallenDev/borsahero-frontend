
import MiniPlayer from 'components/mini-player';
import { CONTROLS, POSITION } from 'components/mini-player';

const STREAM_PLAYBACK_URL =
  'https://6862a942ec56.us-west-2.playback.live-video.net/api/video/v1/us-west-2.634253800984.channel.7ar35zUVbyOE.m3u8';


const Test = () => {

    return (
        <div className="App">
            <MiniPlayer
                streamUrl={STREAM_PLAYBACK_URL}
                controls={[CONTROLS.resize, CONTROLS.close, CONTROLS.mute]}
                position={POSITION.bottomRight}
                transition
            />

            {[...Array(5)].map((_, i) => (
                <div className="App-contentPlaceholder" key={i} />
            ))}
        </div>
    )
}

export default Test;