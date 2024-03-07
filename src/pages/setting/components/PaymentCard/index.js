import { useState } from 'react';

import styles from './index.module.scss';
import { SmallPrimaryButton } from 'ui/buttons';
import PaymentModal from './PaymentModal';
import DeleteModal from './DeleteModal';
import { CreditLogo } from 'ui/svg/logo';
import { SmallTetriaryBtn, SmallDestructiveBtn } from 'ui/buttons';
import CreditCardBrandsMap from 'shared/types/CreditCardBrandsMap'

const PaymentCard = ({cardDetail, ...props}) => {

    let brand_name = cardDetail?.brand ?? null;
    if(brand_name == 'americanexpress') brand_name="amex";

    const [openModal, setOpenModal] = useState(false);
    const [isPayment, setIsPayment] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            {
                cardDetail ?
                <div className={styles.paymentCardWrapper}>
                    <div className={styles.cardTitle}>
                        <span style={{textTransform:'capitalize'}}>{brand_name}</span>
                        <img
                            src={CreditCardBrandsMap[brand_name]}
                            className={styles.cardType}
                        />
                        {/* <CreditLogo width={48} height={48} /> */}
                    </div>
                    <div className={styles.cardDetail}>
                        <span className={styles.name}>{cardDetail?.name}</span>
                        <span className={styles.number}>**** - **** - **** - {cardDetail?.last4}</span>
                    </div>
                    {/* <div className={styles.actionWrapper}>
                        <div className={styles.edit}>
                            <SmallTetriaryBtn text="Edit"/>
                        </div>
                        <div className={styles.delete}>
                            <SmallDestructiveBtn text="Delete" onClick={() => setOpenDelete(true)}/>
                        </div>
                    </div> */}
                </div>
                :
                <div className={styles.wrapper}>
                    <div className={styles.addBtn}>
                        <SmallPrimaryButton text="Add" onClick={() => setOpenModal(true)} />
                    </div>
                </div>   
            }
            {
                openModal ?
                <PaymentModal onClose={() => setOpenModal(false)} onSuccess={() =>{setOpenModal(false); setIsPayment(true);}} /> :<></>
            }
            {
                openDelete ?
                <DeleteModal onClose={() => setOpenDelete(false)} onSuccess={() => {setOpenDelete(false);setIsPayment(false);}}/> :<></>
            }
        </>
    )
}

export default PaymentCard;
