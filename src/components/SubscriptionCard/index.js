import styles from './index.module.scss';
import AvatarViewNum from 'components/AvatarViewNum';
import { Active } from 'ui/tags';
import { H3, SecondaryText, PrimaryText } from 'ui/text';
import { SmallDestructiveButton } from 'ui/buttons';

const SubscriptionCard = ({type, ...props}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.topSection}>
                <AvatarViewNum viewNum={false} />
                <Active />
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.left}>
                    <div className={styles.price}>
                        {
                            type == 'Free' ?
                            <H3 value="Free" />:<H3 value="$50" />
                        }
                        
                        <SecondaryText value="per month" />
                    </div>
                    {
                        type == 'Free' ?
                        <></>
                        :
                        <div className={styles.nextInvoice}>
                            <SecondaryText value="Next invoice" />
                            <PrimaryText value="April 15th" />
                        </div>
                    }
                    
                </div>
                <div className={styles.unsubscribe}>
                    <SmallDestructiveButton text="Unsubscribe" />
                </div>
            </div>
        </div>
    )
}

export default SubscriptionCard;