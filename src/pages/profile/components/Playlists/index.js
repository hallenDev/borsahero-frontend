import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import PopularItem from 'components/PopularItem';
import Playlist from 'components/Playlist';

import { H3 } from 'ui/text';
import { ViewAllBtn, SmallPrimaryButton } from 'ui/buttons';
import { Left, Right } from 'ui/svg/icon';

const state = {type:'playlist'};

const EmptyCard = () => {

    const navigate = new useNavigate();
    const handleUploadVideo = () => {
        navigate('/upload', {state});
    }
    return (
        <div className={styles.emptyVideoCard}>
            <span className="text-custom text-color-primary">Upload your first playlist</span>
            <div className={styles.button}>
                <SmallPrimaryButton text="Upload" onClick={handleUploadVideo} />
            </div>
        </div>
    )
}

const Playlists = ({data=[], ...props}) => {

    let cnt = data.length;

    const videobox = useRef(null);
    const [scrollable, setScrollable] = useState(false);

    const navigate = new useNavigate();
    const handleUploadVideo = () => {
        navigate('/upload', {state});
    }

    useEffect(() => {
        if(videobox.current.offsetWidth < videobox.current.scrollWidth) {
            // console.log(true);
            setScrollable(true);
            // videobox.current.scrollBy(100, 0, {behavior: 'smooth'});
        } else {
            setScrollable(false);
        }
    }, [data])

    const handleLeftScroll = () => {
        videobox.current.scrollBy({left: -318, behavior: 'smooth'});
    }

    const handleRightScroll = () => {
        videobox.current.scrollBy({left: 318, behavior: 'smooth'});
    }

    return (
        <div className={styles.playlistForm}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <H3 value="Playlists" />
                    {
                        cnt > 0 && <ViewAllBtn />
                    }
                </div>
                <div className={styles.rightSection}>
                    {
                        scrollable && 
                        <div className={styles.scrollAction}>
                            <div className={styles.scrollbtn} onClick={handleLeftScroll}>
                                <Left width={28} height={28} />
                            </div>
                            <div className={styles.scrollbtn} onClick={handleRightScroll}>
                                <Right width={28} height={28} />
                            </div>
                        </div>
                    }
                    <div className={styles.upload}>
                        {
                            cnt > 0 && <SmallPrimaryButton text="Upload playlist" onClick={handleUploadVideo} />
                        }
                    </div>
                </div>
            </div>
            <div className={styles.videoList} ref={videobox}>
                {
                    cnt == 0 && <EmptyCard />
                }
                {
                    data.map((item, index) => {
                        return (
                            <div className={styles.item} key={index}>
                                <Playlist data={item} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Playlists;