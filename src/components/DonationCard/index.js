import styles from './index.module.scss';
import Avatar from './Avatar';
import DonateInfo from './DonateInfo';

const DonationCard = ({...props}) => {
    return (
        <div className={styles.cardWrapper}>
            <Avatar />
            <DonateInfo />
        </div>
    )
}

export default DonationCard;