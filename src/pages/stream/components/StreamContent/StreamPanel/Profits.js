import styles from './index.module.scss';
import avatar2 from 'assets/png/avatar2.png';
import { TetriaryGreyText, H3, SecondaryText } from 'ui/text';

const ProfitItem = () => {

    return (
        <div className={styles.profitItemForm}>
            <img src={avatar2} />
            <div className={styles.message}>
                <TetriaryGreyText value="Wade Warren 5:35 pm" />
                <div className={styles.content}>
                    <H3 value="$12" color={'#141414'} />
                    <SecondaryText color={'#141414'} value="Engaging and informative trader" />
                </div>
            </div>
        </div>
    )
}

const Profits = () => {

    return (
        <div className={styles.profitForm}>
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
            <ProfitItem />
        </div>
    )
}

export default Profits;