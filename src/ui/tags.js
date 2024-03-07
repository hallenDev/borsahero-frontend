import styles from './tags.module.scss';
import { See } from 'ui/svg/icon';
import getReadableCount from 'utils/getReadableCount';
import { markets } from 'configs/constants';

export const Live = ({...props}) => {
    return (
        <div className={styles.live}>
            <span className={styles.liveText}>LIVE</span>
        </div>
    )
}

export const Options = ({value="options", ...props}) => {

    const marketData = markets.filter((item) => item.value == value)[0];
    return (
        <div className={styles.options}>
            <span className={styles.optionsText}>
                {
                    marketData.label
                }
            </span>
        </div>
    )
}

export const Free = ({...props}) => {
    return (
        <div className={styles.free}>
            <span className={styles.freeText}>Free</span>
        </div>
    )
}

export const ViewNum = ({count=0, ...props}) => {
    return (
        <div className={styles.viewNum}>
            <See width={23} height={23} />
            <span className={styles.viewNumText}>
                {
                    getReadableCount(count ?? 0)
                }
            </span>
        </div>
    )
}

export const Paid = ({...props}) => {
    return (
        <div className={styles.paid}>
            <span className={styles.paidText}>Paid</span>
        </div>
    )
}

export const Active = ({...props}) => {
    return (
        <div className={styles.active}>
            <span className={styles.activeText}>Active</span>
        </div>
    )
    
}

export const Expired = ({...props}) => {
    return (
        <div className={styles.expired}>
            <span className={styles.expiredText}>Expired</span>
        </div>
    )
    
}

export const Views = ({count=0, ...props}) => {
    return (
        <div className={styles.views}>
            <See color={'#85FF3A'} width={20} height={20} />
            <span>
                {
                    getReadableCount(count ?? 0)
                }
            </span>
        </div>
    )
}

export const Verified = ({...props}) => {
    return (
        <div className={styles.verified}>
            <span>Verified</span>
        </div>
    )
}