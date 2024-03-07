import styles from './index.module.scss';
import Image from 'assets/png/Image1.png';
import { Free, Paid } from 'ui/tags';
import AvatarViewNum from 'components/AvatarViewNum';

const Playlist = ({data, ...props}) => {

    return (
        <div className={styles.playlist}>
            <div className={styles.backCard}></div>
            <div className={styles.foreCard} style={{backgroundImage: data? `url(${data.files[0].poster_url})` : ''}}>
                <div className={styles.top}>
                    <div className={styles.title}>
                        <span className={styles.label}>
                            {data? data.title :'New course'}
                        </span>
                        <span className={styles.bought}>10k bought</span>
                    </div>
                    {
                        data?.content_type == 'free' ?
                        <Free />: <Paid />
                    }
                </div>
                <div className={styles.bottom}>
                    <AvatarViewNum user={data?.user}/>
                </div>
            </div>
        </div>
    )
}

export default Playlist;
