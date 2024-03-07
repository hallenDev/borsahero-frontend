import { useState } from 'react';

import styles from './DeleteModal.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { PrimaryInput, BigField } from 'ui/input';
import { NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';

const DeleteModal = ({onClose, ...props}) => {
    
    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={20} height={20} />
                </div>
                <div className={styles.title}>
                    <PrimaryText value="Delete review?" />
                    <PrimaryGreyText value="This is a one-way ticket – no turning back!" />
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                    <div className={styles.save}>
                        <NormalDestructiveBtn text="Delete" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;