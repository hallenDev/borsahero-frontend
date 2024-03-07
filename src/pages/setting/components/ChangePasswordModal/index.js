import { useState } from 'react';
import styles from './index.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { PrimaryInput, PasswordInput } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import { useToast } from 'components/Toast';

const ChangePasswordModal = ({onClose, ...props}) => {

    const toast = useToast();

    const handleChangePassword = () => {
        toast.open({
            type: "success",
            message: "Your password has been changed!"
        });
        onClose();
    }

    const [data, setData] = useState({
        old_pass: "",
        new_pass: "",
        confirm_pass: ""
    })

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
                    <PrimaryText value="Change password" />
                    <PrimaryGreyText value="Before making changes, give us a nod with your password, please." />
                </div>
                <div className={styles.body}>
                    <PasswordInput 
                        placeholder="Password" 
                        value={data.old_pass} 
                        onChange={handleInputChange}
                        name="old_pass"
                    />
                    <PasswordInput 
                        placeholder="New password" 
                        value={data.new_pass} 
                        onChange={handleInputChange}
                        name="new_pass"
                    />
                    <PasswordInput 
                        placeholder="Confirm new password" 
                        value={data.confirm_pass} 
                        onChange={handleInputChange}
                        name="confirm_pass"
                    />
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Save" onClick={handleChangePassword} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePasswordModal;