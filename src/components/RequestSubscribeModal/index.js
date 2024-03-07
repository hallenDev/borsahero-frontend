import { useNavigate } from "react-router-dom";
import styles from './index.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';


const RequestSubscribeModal = ({onClose, ...props}) => {
    const navigate = useNavigate();
    return (
        <div className="modal">
            <div className={styles.requestSubscribe}>
                <div className={styles.backBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.content}>
                    <PrimaryText value="Unlock unlimited potential" />
                    <PrimaryGreyText value="Subscribe to our platform to start streaming and earning." />
                </div>
                <div className={styles.action}>
                    <div className={styles.item}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.item}>
                        <NormalPrimaryButton text="Subscribe" onClick={() => navigate('/setting/subscriptions')}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestSubscribeModal;