import { useState, useEffect, useRef} from 'react';

import styles from './index.module.scss';
import StreamItem from 'components/StreamItem';
import { ViewAllBtn } from 'ui/buttons';
import { Left, Right } from 'ui/svg/icon';

const Streams = ({...props}) => {

    const videobox = useRef(null);

    const [scrollable, setScrollable] = useState(true);

    useEffect(() => {
        if(videobox.current.offsetWidth < videobox.current.scrollWidth) {
            setScrollable(true);
        } else {
            setScrollable(false);
        }
    }, [])

    const handleLeftScroll = () => {
        videobox.current.scrollBy({left: -330, behavior: 'smooth'});
    }

    const handleRightScroll = () => {
        videobox.current.scrollBy({left: 330, behavior: 'smooth'});
    }

    return (
        <div className={styles.streamWrapper}>
            <div className={styles.titleWrapper}>
                <div className={styles.left}>
                    <div className={styles.title}>Stream of the day</div>
                    <ViewAllBtn />
                </div>
                {
                    scrollable && 
                    <div className={styles.right}>
                        <div className={styles.scrollBtn} onClick={handleLeftScroll}>
                            <Left width={30} height={30} />
                        </div>
                        <div className={styles.scrollBtn} onClick={handleRightScroll}>
                            <Right width={30} height={30} />
                        </div>
                    </div>
                }
            </div>
            <div className={styles.streams} ref={videobox}>
                <StreamItem type="stream"/>
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
                <StreamItem type="stream" />
            </div>
        </div>
    )
}

export default Streams;