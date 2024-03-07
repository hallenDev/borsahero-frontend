import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import styles from './index.module.scss';
import avatar1 from 'assets/png/avatar1.png';

import { SecondaryText, PrimaryText, SecondaryLabel } from 'ui/text';
import { AuthContext } from 'context/AuthProvider'

const Avatar = ({user, ...props}) => {

    const navigate = useNavigate();
    const { signOut } = useContext(AuthContext);

    const logOut = () => {
        signOut();
        navigate("/sign-in");
    }

    return (
        <div className={styles.dropDown}>
            <div className={styles.avatarWrapper}>
                <img src={user?.avatar ?? avatar1} className={styles.avatarImage} />
                <span className={styles.username}>{user?.first_name ?? "Robert"}</span>
            </div>
            <div className={styles.dropdownWrapper}>
                <div className={styles.dropDownContent}>
                    <div className={styles.menuItem}>
                        <Link to ="/my_profile" style={{textDecoration:'none'}}><SecondaryLabel value="My profile" /></Link>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.menuItem} onClick={logOut}>
                        <span className={styles.logoutBtn}>Log out</span>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Avatar;