import styles from './index.module.scss';
import React from 'react';
import { useTimeout } from 'hooks/useTimeout';
import { Close } from 'ui/svg/icon';
import { SecondaryLabel, SecondaryBold } from 'ui/text';

export const Toast = ({type="success", icon=null, title=null, message=null, ...props}) => {
  useTimeout(props.close, 3000);

  return (
    <div className={type=='success' ? styles.toast: styles.toastError}>
        <div>
            <div onClick={props.close} className={styles.closeBtn}>
                <Close width={15} height={15} />
            </div>
        </div>
        <div>
        {
          title && <SecondaryBold value={title} />
        }
        
        <SecondaryLabel value={message} />
        </div>
    </div>
  );
};
