import styles from './index.module.scss';
import { Free, Paid } from 'ui/tags';
import AvatarViewNum from 'components/AvatarViewNum';

const PopularItem = ({data, ...props}) => {
    return (
        <div className={styles.itemWrapper} style={{backgroundImage: data? `url(${data.files[0].poster_url})` : ''}}>
            <div className={styles.topSection}>
                <div className={styles.itemInfo}>
                    <span className={styles.title}>{data? data.title :'New course'}</span>
                    <span className={styles.bought}>10k bought</span>
                </div>
                {
                    data?.content_type == 'free' ?
                    <Free />: <Paid />
                }
            </div>
            <div className={styles.bottomSection}>
                <AvatarViewNum />
            </div>
        </div>
    )
}

export default PopularItem;