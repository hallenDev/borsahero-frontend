import styles from './index.module.scss';
import { Close } from 'ui/svg/icon';
import { useState } from 'react';

import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { PrimaryInput, PasswordInput } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';

const ChangeEmailModal = ({onClose, onNext, ...props}) => {

    const [data, setData] = useState({
        password: "",
        new_email: ""
    });

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.backBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.header}>
                    <PrimaryText value="Change email" />
                    <PrimaryGreyText value="Before making changes, give us a nod with your password, please." />
                </div>
                <div className={styles.body}>
                    <PasswordInput placeholder="Password" value={data.password} name="password" onChange={handleInputChange} />
                    <PrimaryInput placeholder="New email" valye={data.new_email} name="new_email" onChange={handleInputChange} />
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Save" onClick={onNext}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeEmailModal;