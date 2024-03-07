import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import styles from './index.module.scss';
import { H3 } from 'ui/text';
import BillingCard from './components/BillingCard';
import PlanCard from './components/PlanCard';
import { useToast } from 'components/Toast';

import { getSubscription, subscribePlan } from 'shared/api/member';

const SubscriptionsTab = ({...props}) => {

    const toast = useToast();

    const queryClient = useQueryClient();

    const [productId, setProductId] = useState()

    const { data } = useQuery('subscription', getSubscription, {
        onError: error => {
            console.log(error)
        },
    });

    const { mutate, isLoading } = useMutation(subscribePlan, {
        onSuccess: subscription => {
          queryClient.setQueryData('subscription', old => ({
            ...old,
            subscription,
          }))
        },
        onError: error => {
            toast.open({
                type: "error",
                message: `${error.data.msg}`
            });
        },
    })

    const { products = [], subscription } = data || {}
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.billingWrapper}>
                {/* <H3 value="Billing info" /> */}
                {
                    subscription ? 
                    <PlanCard subscription={subscription} products={products} />
                    :
                    <div className={styles.cardGroup}>
                        {
                            products.map(product => (
                                    <BillingCard 
                                        {...product} 
                                        key={product.id} 
                                        isLoading={isLoading && productId === product.id}
                                        isDisabled={isLoading && productId !== product.id}
                                        onSubscribe={() => {
                                            setProductId(product.id);
                                            mutate({ product_id: product.id})
                                        }}
                                    />
                                )
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SubscriptionsTab;