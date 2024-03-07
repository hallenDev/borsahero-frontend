import styles from './index.module.scss';
import { Close, Delete } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import { useToast } from 'components/Toast';

const DeleteAccountModal = ({onClose, ...props}) => {

    const toast = useToast();

    const deleteAccountAction = () => {
        toast.open({
            type: "error",
            message: "Account Deleted Successfully!"
        });
        onClose();
    }
    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={20} height={20} />
                </div>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <Delete width={25} height={25} />
                    </div>
                    <div className={styles.text}>
                        <PrimaryText value="Delete account?" />
                        <PrimaryGreyText
                            value="This action is irreversible. Deleting your profile means saying goodbye to all your data and content. Are you sure you want to proceed?"
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.delete}>
                        <NormalDestructiveBtn text="Delete" onClick={deleteAccountAction}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccountModal;