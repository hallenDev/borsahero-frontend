import styles from './DeleteModal.module.scss';
import { Close, Delete } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';

const DeleteModal = ({onClose, onSuccess, ...props}) => {
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
                        <PrimaryText value="Delete card?" />
                        <PrimaryGreyText
                            value="Keep in mind that any active subscriptions or pending payments associated with this card may be affected."
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.delete}>
                        <NormalDestructiveBtn text="Delete" onClick={onSuccess} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;