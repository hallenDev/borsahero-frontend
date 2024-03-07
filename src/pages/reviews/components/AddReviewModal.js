import { useState } from 'react';

import styles from './AddReviewModal.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText } from 'ui/text';
import { PrimaryInput, BigField } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import { Rating } from 'react-simple-star-rating';

const AddReviewModal = ({onClose, ...props}) => {
    
    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={20} height={20} />
                </div>
                <div className={styles.title}>
                    <PrimaryText value="Add review" />
                </div>
                <div className={styles.content}>
                    <Rating 
                        size={23} 
                        initialValue={0} 
                        emptyColor={'#FFFFFF66'} 
                        fillColor={'#946EFF'} 
                        allowHover={false}
                    />
                    <BigField placeholder="Description" limit={250} />
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Save" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReviewModal;