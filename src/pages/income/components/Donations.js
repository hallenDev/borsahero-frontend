import styles from './Donations.module.scss';
import { H3, PrimaryBold } from 'ui/text';

import SubscriptionCard from 'components/SubscriptionCard';
import DonationCard from 'components/DonationCard';

const Donations = ({type, ...props}) => {
    return (
        <div className={styles.donationWrapper}>
            <div className={styles.title}>
                <div className={styles.deskTitle}>
                    <H3 value="Donation History" />
                </div>
                <div className={styles.mobTitle}>
                    <PrimaryBold value="Donation History" />
                </div>
            </div>
            <div>
            <div className={styles.cardWrapper}>
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
                <DonationCard />
            </div>
            </div>
        </div>
    )
}

export default Donations;