import { useState } from 'react';

import styles from './index.module.scss';
import { SmallPrimaryButton } from 'ui/buttons';
import PaymentModal from './PaymentModal';
import DeleteModal from './DeleteModal';
import { Bank } from 'ui/svg/icon';
import { SmallTetriaryBtn, SmallDestructiveBtn } from 'ui/buttons';
import CreditCardBrandsMap from 'shared/types/CreditCardBrandsMap'

const PayoutCard = ({cardDetail, onClickAdd, isLoading, ...props}) => {

    // let brand_name = cardDetail?.brand ?? null;
    // if(brand_name == 'americanexpress') brand_name="amex";

    // const [openModal, setOpenModal] = useState(false);
    // const [isPayment, setIsPayment] = useState(false);
    // const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            {
                cardDetail && cardDetail.details_submitted ?
                <div className={styles.payoutCardWrapper}>
                    <Bank width={25} height={25} />
                    <div className={styles.cardDetail}>
                        <span className={styles.name}>{`${cardDetail.bank_name}         ${cardDetail.currency.toUpperCase()}`}</span>
                        <span className={styles.number}>{`${cardDetail.routing_number} **** ${cardDetail.last4}`}</span>
                    </div>
                </div>
                :
                <div className={styles.wrapper}>
                    <div className={styles.addBtn}>
                        <SmallPrimaryButton text="Add" onClick={onClickAdd} isLoading={isLoading} />
                    </div>
                </div>   
            }
        </>
    )
}

export default PayoutCard;
