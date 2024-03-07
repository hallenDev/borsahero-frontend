import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import styles from './PaymentsTab.module.scss';
import PaymentCard from './PaymentCard';
import PayoutCard from './PayoutCard';
import { H3 } from 'ui/text';

import {
    getPaymentMethod,
    getStripeAccountLink,
    getPayoutDetails,
} from 'shared/api/member'

const PaymentsTab = ({...props}) => {

    const { data: cardDetails } = useQuery('payment-details', getPaymentMethod, {
        onError: error => {
          console.log(error)
        },
    })

    const { data: payoutDetails, refetch } = useQuery(
        'payout-details',
        getPayoutDetails,
        {
            onError: error => {
                console.log(error);
            }
        }
    )

    const { mutateAsync, isLoading: isCreatingLink } = useMutation(getStripeAccountLink)

    const handlePayout = async () => {
        try {
          const accountLink = await mutateAsync();

          window.open(accountLink.url,"_self")
    
        //   Linking.canOpenURL(accountLink.url).then(supported => {
        //     if (supported) {
        //       Linking.openURL(accountLink.url)
        //     } else {
        //       console.log("Don't know how to open URI: " + accountLink.url)
        //     }
        //   })
        } catch (error) {
            toast.open({
                type: "error",
                message: `${error?.data?.msg || error?.message}`
            })
        }
    }

    // useEffect(() => {
    //     if (checkPayoutDetails) {
    //       refetch()
    //     }
    // }, [checkPayoutDetails])

    return (
        <div className={styles.wrapper}>
            <div className={styles.payment}>
                <div className={styles.header}>
                    <H3 value="Payment details" />
                    {
                        cardDetails && <div className={styles.editBtn}>Edit</div>
                    }
                </div>
                
                <PaymentCard cardDetail={cardDetails} />
            </div>
            <div className={styles.payment}>
                <div className={styles.header}>
                    <H3 value="Payout details" />
                    {
                        payoutDetails?.details_submitted && <div className={styles.editBtn}>Edit</div>
                    }
                </div>
                <PayoutCard cardDetail={payoutDetails} isLoading={isCreatingLink} onClickAdd={handlePayout} />
            </div>
        </div>
    )
}

export default PaymentsTab;