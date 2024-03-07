import styles from './index.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText, SecondaryLinkText } from 'ui/text';
import { PrimaryInput, PasswordInput } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import VerifyCodeInput from 'components/verifyCodeInput';
import { useToast } from 'components/Toast';

const OTPModal = ({onClose, ...props}) => {

    const toast = useToast();

    const handleVerifyCodeChange = (value) => {
        // setCodeError("");
        // setVerifyCode(value);
    }
    const handleSaveAction = () => {
        toast.open({
            type: "success",
            message: "Your email has been changed!"
        });
        onClose();
    }

    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.backBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.header}>
                    <PrimaryText value="Almost done!" />
                    <PrimaryGreyText value="We have sent a confirmation code to your current email. Please enter it to confirm your email change." />
                </div>
                <div className={styles.body}>
                    <VerifyCodeInput onChange={handleVerifyCodeChange} />
                    <div className={styles.resend}>
                        <SecondaryLinkText value="Resend code" />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Save" onClick={handleSaveAction} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTPModal;