import styles from './index.module.scss';

import Image from 'assets/png/Image1.png';

import { Live, ViewNum, Options, Free } from 'ui/tags';
import AvatarViewNum from 'components/AvatarViewNum';
import { SmallPrimaryButton } from 'ui/buttons';

const TrendingItem = ({...props}) => {
    return (
        <div className={styles.trandingWrapper}>
            <img src={Image} className={styles.trendingCard} />
            <div className={styles.topSection}>
                <div className={styles.topLeft}>
                    <Live />
                    <ViewNum />
                </div>
                <div className={styles.topRight}>
                    <Options />
                    <Free />
                </div>
            </div>
            <div className={styles.bottomSection}>
                <AvatarViewNum />
                <div style={{width: '82px'}}>
                    <SmallPrimaryButton text="subscribe" />
                </div>
            </div>
        </div>
    )
}

export default TrendingItem;