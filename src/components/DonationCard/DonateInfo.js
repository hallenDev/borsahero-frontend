import styles from './DonateInfo.module.scss';

import { SecondaryText, H3 } from 'ui/text';

const DonateInfo = ({...props}) => {
    return (
        <div className={styles.wrapper}>
            <SecondaryText value="donated" />
            <H3 value="$12" />
        </div>
    )
}

export default DonateInfo;