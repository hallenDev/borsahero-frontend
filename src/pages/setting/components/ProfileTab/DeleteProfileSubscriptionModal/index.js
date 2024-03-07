import { useQueryClient, useMutation } from 'react-query';
import styles from './index.module.scss';
import { Close, Delete } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import { useToast } from 'components/Toast';
import { deleteProfileSubscription } from 'shared/api/member';

const DeleteProfileSubscriptionModal = ({onClose, ...props}) => {
    const toast = useToast();


    const queryClient = useQueryClient()
    const { mutate, isLoading } = useMutation(deleteProfileSubscription, {
        onSuccess: data => {
            queryClient.setQueryData('profile-subscription', old => null);
            onClose();
        },
        onError: error => {
            toast.open({
                type: "error",
                message: `${error?.data?.msg}`
            });
        },
    })

    const deleteAccountAction = () => {
        mutate();
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
                        <PrimaryText value="Remove profile subscription?" />
                        <PrimaryGreyText
                            value="If you remove profile subscription, your paid content will become free. There will be no way to restore it."
                        />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.delete}>
                        <NormalDestructiveBtn text="Delete" onClick={deleteAccountAction} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProfileSubscriptionModal;