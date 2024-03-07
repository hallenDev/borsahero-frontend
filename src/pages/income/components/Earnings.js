import styles from './Earnings.module.scss';

import { User, Heart, Money, Info } from 'ui/svg/icon';
import { H3, PrimaryBold } from 'ui/text';
import SubscriberCard from 'components/SubscriberCard';

const PaidUsers = ({...props}) => {
    return (
        <div className={styles.summaryCardWrapper}>
            <div className={styles.userIcon}>
                <User color="black" width={25} height={25} />
            </div>
            <div className={styles.info}>
                <span className={styles.infoNum}>
                    825
                </span>
                <span className={styles.infoSub}>Paid users</span>
            </div>
        </div>
    )
}

const Follwers = ({...props}) => {
    return (
        <div className={styles.summaryCardWrapper}>
            <div className={styles.followIcon}>
                <Heart color="black" width={25} height={25} />
            </div>
            <div className={styles.info}>
                <span className={styles.infoNum}>
                    4321
                </span>
                <span className={styles.infoSub}>Followers</span>
            </div>
        </div>
    )
}

const TotalBalance = ({...props}) => {
    return (
        <div className={styles.summaryCardWrapper}>
            <div className={styles.balanceIcon}>
                <Money width={25} height={25} />
            </div>
            <div className={styles.info}>
                <span className={styles.infoNum}>$1274.3</span>
                <span className={styles.infoSub}>Total balance</span>
            </div>
        </div>
    )
}

const Earnings = ({...props}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.summary}>
                <PaidUsers />
                <Follwers />
                <TotalBalance />
            </div>
            <div className={styles.subscriberList}>
                <div className={styles.deskTitle}>
                    <H3 value="Subscribers" />
                </div>
                <div className={styles.mobTitle}>
                <PrimaryBold value="Subscribers" />
                </div>
            </div>
            <div className={styles.subscriberList} >
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />
                <SubscriberCard />        
            </div>
        </div>
    )
}

export default Earnings;
