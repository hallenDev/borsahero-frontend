import { useState } from 'react';
import styles from './index.module.scss';
import { H3, SecondaryGreyText } from 'ui/text';
import { SmallPrimaryButton, SmallTetriaryBtn } from 'ui/buttons';
import { Active, Expired } from 'ui/tags';
import DeleteSubscriptionModal from '../DeleteSubscriptionModal';
import ChangeSubscriptionModal from '../ChangeSubscriptionModal';

import useDateTime from 'utils/useDateTime'

const PlanCard = ({ subscription, products = [] }) => {

    const { getSubscriptionDate } = useDateTime();
    const [deleteSubscription, setDeleteSubscription] = useState(false);
    const [changeSubscription, setChangeSubscription] = useState(false);

    return (
        <>
            <div className={styles.planCard}>
                <div className={styles.tag}>
                    {
                        subscription?.ended_at && subscription?.is_cancelled ? 
                        <Expired />
                        :
                        <Active />

                    }
                </div>
                <div className={styles.content}>
                    <H3 value={`${subscription?.product?.title}`} />
                    {subscription?.ended_at &&
                        (subscription?.is_cancelled ? (
                            <SecondaryGreyText value={`Expire on ${getSubscriptionDate(Number(subscription?.ended_at * 1000))}`} />
                        ) : (
                            <SecondaryGreyText value={`Next invoice on ${getSubscriptionDate(Number(subscription?.ended_at * 1000))}`} />
                        ))}
                    <SecondaryGreyText value={`Billing ${subscription?.product?.title?.toLowerCase()}`} />
                </div>
                <div className={styles.action}>
                    <div className={styles.item}>
                        <SmallPrimaryButton text="change" onClick={() => setChangeSubscription(true)}/>
                    </div>
                    {
                        !subscription.is_cancelled && 
                        <div className={styles.item}>
                            <SmallTetriaryBtn text="Cancel" onClick={() => setDeleteSubscription(true)} />
                        </div>
                    }
                    
                </div>
            </div>
            {
                deleteSubscription && <DeleteSubscriptionModal onClose={() => setDeleteSubscription(false)} />
            }
            {
                changeSubscription && <ChangeSubscriptionModal subscription={subscription} products={products} onClose={() => setChangeSubscription(false)} />
            }
        </>
    )
}

export default PlanCard;