import { useNavigate } from 'react-router-dom';

import styles from 'components/UserAvatar/index.module.scss';
import { SecondaryLabel } from 'ui/text';

const UserAvatar = ({url, ...props}) => {

    const navigate = useNavigate();

    const handleGoProfile = () => {
        navigate("/user_profile");
    }

    return (
        <div className={styles.userAvatarWrapper} onClick={handleGoProfile}>
            <img src={url} width={32} height={32} />
            <div className={styles.tooltip}>
                <span>Carla Dian</span>
            </div>
        </div>
    )
}

export default UserAvatar;