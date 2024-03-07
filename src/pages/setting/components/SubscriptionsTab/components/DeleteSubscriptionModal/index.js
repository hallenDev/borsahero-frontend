import { useMutation, useQueryClient } from 'react-query';

import styles from './index.module.scss';
import { NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import { Delete, Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';

import { cancelSubscription } from 'shared/api/member';

const DeleteSubscriptionModal = ({onClose, ...props}) => {
    const queryClient = useQueryClient();
    
    const { mutate, isLoading } = useMutation(cancelSubscription, {
        onSuccess: data => {
          if (data?.is_cancelled) {
            queryClient.setQueryData('subscription', old => ({
              ...old,
              subscription: {
                ...old?.subscription,
                is_cancelled: true,
              },
            }))
            onClose();  
          }
          
        },
        onError: error => {
          console.log(error)
        },
    })

    return (
        <div className="modal">
            <div className={styles.deleteModal}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={20} height={20} />
                </div>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <Delete width={24} height={24} />
                    </div>
                    <div className={styles.description}>
                        <PrimaryText value="Cancel subscription?" />
                        <PrimaryGreyText value="Your subscription will remain active until the next invoice date. After that, it will become inactive." />
                    </div>
                </div>
                <div className={styles.action}>
                    <div className={styles.item}>
                        <NormalTetriaryBtn text="Exit" onClick={onClose} />
                    </div>
                    <div className={styles.item}>
                        <NormalDestructiveBtn text="Cancel subscription" isLoading={isLoading} onClick={mutate}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteSubscriptionModal;