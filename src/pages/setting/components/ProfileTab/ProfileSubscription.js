import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './index.module.scss';
import { Money } from 'ui/svg/icon';
import { H3, PrimaryText, PrimaryGreyText } from 'ui/text';
import { NormalPrimaryButton, NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';

import SubscriptionModal from './SubscriptionModal';
import DeleteProfileSubscriptionModal from './DeleteProfileSubscriptionModal';
import { getProfileSubscription } from 'shared/api/member';

const ProfileSubscription = () => {

    const [openSubscription, setOpenSubscription] = useState(false);
    const [openDeleteSubscription, setOpenDeleteSubscription] = useState(false);

    const { data: profileProduct } = useQuery(
        'profile-subscription',
        getProfileSubscription,
        {
          onError: error => {
            console.log(error)
          },
        },
    );

    return (
        <>
            <div className={styles.subscriptionCard}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <Money width={24} height={24} />
                    </div>
                    <div className={styles.description}>
                        <H3 value="Profile subscription" />
                        {
                            profileProduct ? 
                            <PrimaryGreyText value={`$${profileProduct.price / 100} per month`} />
                            :
                            <PrimaryGreyText value="Set your own price for premium content and exclusive perks. Simply enter the desired subscription price and confirm to provide your audience with an enhanced experience. Your subscribers will get access to exclusive content, updates, and more." />
                        }
                        
                    </div>
                </div>
                {
                    profileProduct ? 
                    <div className={styles.action}>
                        <div className={styles.item}>
                            <NormalPrimaryButton text="edit" onClick={() => {setOpenSubscription(true)}} />
                        </div>
                        <div className={styles.item}>
                            <NormalDestructiveBtn text="Remove" onClick={() => setOpenDeleteSubscription(true)} />
                        </div>
                    </div>
                    :
                    <NormalPrimaryButton text="Create profile subscription" onClick={() => {setOpenSubscription(true)}} />

                }
            </div>
            {
                openSubscription ?
                <SubscriptionModal onClose={() => setOpenSubscription(false)} isEdit={profileProduct ? true: false} /> : <></>
            }
            {
                openDeleteSubscription ?
                <DeleteProfileSubscriptionModal onClose={() => setOpenDeleteSubscription(false)} /> : <></>
            }
        </>
    )
}

export default ProfileSubscription;