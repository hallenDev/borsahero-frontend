import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from './Avatar';
import Notification from './Notification';

import styles from './index.module.scss';
import { SmallPrimaryButton } from 'ui/buttons';
import { AuthContext } from 'context/AuthProvider';

const Account = ({...props}) => {

    const { isSignedIn, userData } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSignin = () => {
        navigate("/sign-in");
    }
    return (
        <div className={styles.accountWrapper}>
            {
                isSignedIn ?
                <>
                    <Notification />
                    <Avatar user={userData} />
                </>
                :
                <div style={{width:'100px'}}>
                    <SmallPrimaryButton text="Sign in" onClick={handleSignin} />
                </div>
                
            }
        </div>
    )
}

export default Account;