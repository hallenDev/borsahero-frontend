import { useState } from 'react';
import styles from './index.module.scss';
import ChangePasswordModal from '../ChangePasswordModal';
import { PrimaryInput, BigField } from 'ui/input';
import { NormalPrimaryButton, NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import { H3, PrimaryText, PrimaryGreyText } from 'ui/text';

const PasswordEdit = () => {

    const [openPasswordChange, setOpenPasswordChange] = useState(false);

    return(
        <>
            <div className={styles.settingCard}>
                <div className={styles.passwordWrapper}>
                    <H3 value="Password" />
                    <PrimaryText value="**********" />
                </div>
                <NormalPrimaryButton text="Change password" onClick={() => setOpenPasswordChange(true)}/>
            </div>
            {
                openPasswordChange ?
                <ChangePasswordModal onClose={() => setOpenPasswordChange(false)} /> : <></>
            }
        </>
    )
}

export default PasswordEdit;