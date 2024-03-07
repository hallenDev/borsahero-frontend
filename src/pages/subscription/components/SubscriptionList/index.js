import styles from './index.module.scss';
import SubscriptionCard from 'components/SubscriptionCard';

const SubscriptionList = ({type, ...props}) => {
    return (
        <div className={styles.wrapper}>
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
            <SubscriptionCard type={type} />
        </div>
    )
}

export default SubscriptionList;