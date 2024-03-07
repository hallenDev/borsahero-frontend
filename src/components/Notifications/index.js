import styles from './index.module.scss';
import { Close } from 'ui/svg/icon';

const Notification = ({title, message, type, ...props}) => {
    return (
        <div className={type == 'success'? styles.toastSuccess: styles.toastFailed} role="alert">
            <div className={styles.toastMessage}>
                <p className={styles.title}>{title}</p>
                <SecondaryLabel value={message} />
            </div>
            <button className={styles.toastCloseBtn}"toast-close-btn" onClick={onClose}>
                <Close />
            </button>
        </div>
    )
}

export default Notification;