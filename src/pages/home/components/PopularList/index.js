import { useRef, useEffect, useState } from 'react';
import { useQuery } from 'react-query'

import styles from './index.module.scss';
import PopularItem from 'components/PopularItem';
import { ViewAllBtn } from 'ui/buttons';
import { Left, Right } from 'ui/svg/icon';
import Playlist from 'components/Playlist';
import { getPopularPlaylists } from 'shared/api/member'

const PopularList = ({...props}) => {

    const { data = [] } = useQuery('popular-playlists', getPopularPlaylists)

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
        videobox.current.scrollBy({left: -268, behavior: 'smooth'});
    }

    const handleRightScroll = () => {
        videobox.current.scrollBy({left: 268, behavior: 'smooth'});
    }

    return (
        <div className={styles.popularListWrapper}>
            <div className={styles.titleWrapper}>
                <div className={styles.left}>
                    <div className={styles.title}>Popular playlists</div>
                    <ViewAllBtn />
                </div>
                {
                    setScrollable && 
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
            <div className={styles.playlist} ref={videobox}>
                {
                    data.map((item, index) => {
                        return (
                            <div className={styles.item} key={index}>
                                <Playlist data={item}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PopularList;