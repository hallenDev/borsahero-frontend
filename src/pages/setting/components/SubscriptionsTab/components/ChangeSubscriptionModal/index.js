import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import styles from './index.module.scss';

import { PrimaryText, PrimaryGreyText, H3, SecondaryGreyText, H2, SecondaryLabel } from 'ui/text';
import { Close } from 'ui/svg/icon';
import { updateSubscription } from 'shared/api/member';
import { NormalPrimaryButton } from 'ui/buttons';

const ChangeSubscriptionModal = ({onClose, subscription, products = [], ...props}) => {

    const queryClient = useQueryClient();
    const [productId, setProductId] = useState('');
    const { mutate, isLoading } = useMutation(updateSubscription, {
        onSuccess: subscription => {
            queryClient.setQueryData('subscription', old => ({
                ...old,
                subscription,
            }))
            onClose();
        },
        onError: error => {
            console.log(error)
        },
    })

    const handleSubscribe = _productId => {
        setProductId(_productId)
        mutate({ product_id: _productId })
    }

    return (
        <div className="modal">
            <div className={styles.changeSubscription}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={20} height={20} />
                </div>
                <div className={styles.title}>
                    <PrimaryText value="Change subscription" />
                    <PrimaryGreyText value="Your subscription remains active until the next invoice. Changing plans may adjust previous payments. No extra charges for plan switches until the next invoice if already paid in advance." />
                </div>
                <div className={styles.cardList}>
                {
                    products.map(product => 
                        subscription?.product?.id === product.id ? null : (
                            <div className={styles.cardItem} key={product.id}>
                                <div className={styles.cardTitle}>
                                    <H3 value={product.title} />
                                    <SecondaryGreyText value={product.description} />
                                </div>
                                <div className={styles.price}>
                                    <H2 value={`$${product.price / 100}`} />
                                    <SecondaryLabel value={`${product.per_text}`} />
                                </div>
                                <div className={styles.action}>
                                <NormalPrimaryButton 
                                    text="Subscribe" 
                                    isLoading={isLoading && productId === product.id}
                                    onClick={() => handleSubscribe(product.id)}
                                />
                                </div>
                            </div>
                        )
                    )
                }
                </div>
            </div>
        </div>
    )
}

export default ChangeSubscriptionModal;