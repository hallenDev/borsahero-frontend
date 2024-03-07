import styles from './index.module.scss';
import { Notification as NotiIcon } from 'ui/svg/icon';
import { PrimaryBold } from 'ui/text';
import { Close, Live, Playlist } from 'ui/svg/icon';

const LiveStreamNotif = () => {
    return (
        <div className={styles.liveNot}>
            <div className={styles.liveIcon}>
                <Live width={22} height={22} />
            </div>
            <div className={styles.content}>
                <span><span className={styles.name}>Mary Jane</span> started live stream</span>
            </div>
        </div>
    )
}

const VideoUploadNotif = () => {
    return (
        <div className={styles.liveNot}>
            <div className={styles.liveIcon}>
                <Playlist width={22} height={22} />
            </div>
            <div className={styles.content}>
                <span><span className={styles.name}>Mary Jane</span> uploaded new video</span>
            </div>
        </div>
    )
    
}

const Notification = ({...props}) => {
    return (
        <div className={styles.dropdown}>
            <div className={styles.notificationWrapper}>
                <NotiIcon width={24} height={24} />
                <div className={styles.notCountWrapper}>
                    <span className={styles.notCount}>2</span>
                </div>
            </div>
            <div className={styles.panelWrapper}>
                <div className={styles.panel}>
                    <div className={styles.panelContent}>
                        <div className={styles.header}>
                            <PrimaryBold value="Notifications" />
                            <div className={styles.close}>
                                <Close width={24} height={24} />
                            </div>
                        </div>
                        <div className={styles.item}>
                            <LiveStreamNotif />
                        </div>
                        <div className={styles.item}>
                            <VideoUploadNotif />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification;