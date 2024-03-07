import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import StreamItem from 'components/StreamItem';

import { H3 } from 'ui/text';
import { ViewAllBtn, SmallPrimaryButton } from 'ui/buttons';
import { Left, Right } from 'ui/svg/icon';

const state = {type:'single-video'};

const EmptyCard = () => {

    const navigate = new useNavigate();
    // const handleUploadVideo = () => {
    //     navigate('/upload', { state });
    // }
    return (
        <div className={styles.emptyVideoCard}>
            <span className="text-custom text-color-primary">No video</span>
            {/* <div className={styles.button}>
                <SmallPrimaryButton text="Upload" onClick={handleUploadVideo} />
            </div> */}
        </div>
    )
}

const Videos = ({data=[], ...props}) => {

    let cnt = data.length;

    const videobox = useRef(null);

    const [scrollable, setScrollable] = useState(false);

    const navigate = new useNavigate();
    const handleUploadVideo = () => {
        navigate('/upload', { state });
    }

    useEffect(() => {
        if(videobox.current.offsetWidth < videobox.current.scrollWidth) {
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
        <div className={styles.videoForm}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <H3 value="Videos" />
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
                    {/* <div className={styles.upload}>
                        {
                            cnt > 0 && <SmallPrimaryButton text="Upload video" onClick={handleUploadVideo} />
                        }
                    </div> */}
                </div>
                
            </div>
            <div className={styles.videoList} ref={videobox}>
                {
                    cnt == 0 && <EmptyCard />
                }
                {
                    data.map((item, index) => {
                        return (
                            <StreamItem key={index} data={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Videos;