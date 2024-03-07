import styles from './ReviewCard.module.scss';
import avatar1 from 'assets/png/avatar1.png';
import { SecondaryText } from 'ui/text';
import { Rating } from 'react-simple-star-rating';
import { Delete } from 'ui/svg/icon';

const ReviewCard = ({onClickDelete, ...props}) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.deleteBtn} onClick={onClickDelete}>
                <Delete width={23} height={23} color={'#FF3535'} />
            </div>
            <div className={styles.userWrapper}>
                <div className={styles.user}>
                    <img src={avatar1} className={styles.avatar} />
                    <div className={styles.userInfo}>
                        <span className={styles.username}>Carla Bator</span>
                        <SecondaryText value="7 November" />
                    </div>
                </div>
                <div className={styles.rating}>
                    <Rating size={23} readonly={true} initialValue={4} emptyColor={'#FFFFFF66'} fillColor={'#946EFF'} />
                </div>
            </div>
            <div className={styles.description}>
                TraderX on [Trading App Name] is exceptional. Their market analysis is precise, and the transparency in sharing trade strategies is commendable. TraderX's consistent profits reflect a deep understanding of the market. Highly recommended for traders at all levels.
            </div>
        </div>
    )
}

export default ReviewCard