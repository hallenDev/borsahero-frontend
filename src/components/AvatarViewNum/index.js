import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import avatar1 from 'assets/png/avatar1.png';
import getReadableCount from 'utils/getReadableCount';

const AvatarViewNum = ({user, viewNum=true, ...props}) => {

    const navigate = useNavigate();

    const handleGoProfile = (e) => {
        e.preventDefault();
        const state = {user: user};
        navigate("/user_profile", { state });
    }

    return (
        <div className={styles.wrapper} onClick={handleGoProfile}>
            <img className={styles.avatar} src={user?.avatar ?? avatar1} />
            <div className={styles.viewInfoWrapper}>
                <span className={styles.username}>{`${user?.first_name} ${user?.last_name}`}</span>
                {
                    viewNum ? 
                    <span className={styles.viewNum}>{getReadableCount(user?.view_count)} viewed</span>
                    :<></>
                }
            </div>
        </div>
    )
}

export default AvatarViewNum;