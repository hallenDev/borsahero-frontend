import { useState } from 'react';
import styles from './index.module.scss';
import { H3, PrimaryText, PrimaryGreyText } from 'ui/text';
import { Verified } from 'ui/tags';
import { NormalPrimaryButton, NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import ChangeEmailModal from '../ChangeEmailModal';
import OTPModal from '../OTPModal';


const EmailEdit = ({userData, ...props}) => {

    const [openEmailChange, setOpenEmailChange] = useState(false);
    const [openOTP, setOpenOTP] = useState(false);
    const [passShow, setPassShow] = useState(false);

    return (
        <>
            <div className={styles.settingCard}>
                <div className={styles.mailWrapper}>
                    <div className={styles.title}>
                        <H3 value="Email" />
                        <Verified />
                    </div>
                    <PrimaryText value={userData?.email ?? ""} />
                </div>
                <NormalPrimaryButton text="Change email" onClick={() => setOpenEmailChange(true)}/>
            </div>
            {
                openEmailChange ?
                <ChangeEmailModal onClose={() => setOpenEmailChange(false)} onNext={() => {setOpenEmailChange(false); setOpenOTP(true);}} /> : <></>
            }
            {
                openOTP ?
                <OTPModal onClose={() => setOpenOTP(false)} /> : <></>
            }
        </>
    )
}

export default EmailEdit;