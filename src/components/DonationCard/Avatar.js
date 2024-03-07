import { useNavigate } from 'react-router-dom';
import styles from './Avatar.module.scss';
import avatar1 from 'assets/png/avatar1.png';
import { PrimaryText } from 'ui/text';

import { Free } from 'ui/tags';

const Avatar = ({...props}) => {

    const navigate = useNavigate();

    const handleGoProfile = () => {
        navigate("/user_profile");
    }

    return (
        <div className={styles.wrapper} onClick={handleGoProfile}>
            <img src={avatar1} className={styles.avatar}/>
            <div className={styles.avatarInfo}>
                <PrimaryText value="Jack Green" />
                <Free />
            </div>
        </div>
    )
}

export default Avatar;