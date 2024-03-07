import styles from './index.module.scss';
import { H3, SecondaryGreyText, H2, SecondaryLabel } from 'ui/text';
import { NormalPrimaryButton } from 'ui/buttons';

const BillingCard = ({
    title,
    description,
    per_text,
    price,
    isLoading = false,
    isDisabled = false,
    onSubscribe = noop,
}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <H3 value={title} />
                <SecondaryGreyText value={description} />
            </div>
            <div className={styles.price}>
                <H2 value={`$${price / 100}`} />
                <SecondaryLabel value={`${per_text}`} />
            </div>
            <div className={styles.action}>
                <NormalPrimaryButton 
                    text="Subscribe" 
                    isLoading={isLoading}
                    onClick={onSubscribe}
                />
            </div>
        </div>
    )
}

export default BillingCard;