import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import styles from './index.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { PrimaryInput, PasswordInput } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';

import { editProfileSubscription, createProfileSubscription } from 'shared/api/member';
import { useToast } from 'components/Toast';

const SubscriptionModal = ({onClose, isEdit=false, ...props}) => {

    const toast = useToast();

    const queryClient = useQueryClient();

    const [price, setPrice] = useState({
        value: "",
        error: ""
    });

    const handlePriceChange = (e) => {
        if(e.target.value != "" && isNaN(e.target.value)) {
            return;
        }
        setPrice({
            value: e.target.value,
            error: e.target.value == "" ? 'This field is required': ""
        });
    }

    const handleResetPrice = () => {
        setPrice({
            value: "",
            error: 'This field is required'
        });
    }

    const { mutate, isLoading } = useMutation(
        isEdit ? editProfileSubscription : createProfileSubscription,
        {
          onSuccess: profileProduct => {
            queryClient.setQueryData('profile-subscription', old => ({
              ...profileProduct,
            }))
            onClose()
          },
          onError: error => {
            // modalRef.current?.showToast(error?.data?.msg)
            toast.open({
                type: "error",
                message: `${error?.data?.msg}`
            });
          },
        },
    );

    const handleProfileSubscription = () => {
        if(price.value=="") {
            setPrice({
                value: "",
                error: 'This field is required'
            });
            return;
        }
        mutate({price: price.value});
    }

    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.backBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.header}>
                    <PrimaryText value="Create profile subscription" />
                    <PrimaryGreyText value="Please set the price" />
                </div>
                <div className={styles.body}>
                    <PrimaryInput 
                        placeholder="$0.0 per month" 
                        value={price.value}
                        error={price.error}
                        onChange={handlePriceChange}
                        reset={handleResetPrice}
                    />
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Confirm" isLoading={isLoading} onClick={handleProfileSubscription} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionModal;