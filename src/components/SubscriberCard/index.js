import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import avatar2 from 'assets/png/avatar2.png';
import { PrimaryText } from 'ui/text';
import { Free } from 'ui/tags';

const SubscriberCard = ({...props}) => {

    const navigate = useNavigate();

    const handleGoProfile = () => {
        navigate("/user_profile");
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarWrapper} onClick={handleGoProfile}>
                <img src={avatar2} className={styles.avatar} />
                <PrimaryText value="Jack Green" />
            </div>
            <Free />
        </div>
    )
}

export default SubscriberCard;