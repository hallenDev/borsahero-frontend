import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Left } from 'ui/svg/icon';
import noop from 'utils/noop';

import styles from 'ui/buttons.module.scss';

export const NormalPrimaryButton = ({text, onClick, isLoading, ...props}) => {

    return (
        <div className={styles.npButtonForm}>
            <button className={styles.npButton} onClick={onClick} disabled={isLoading}>
                {
                    isLoading ? 
                    <ClipLoader color='white' size={20} />
                    : <>{text}</>
                }
                </button>
        </div>
    )

}

export const SmallPrimaryButton = ({text, icon=null, onClick, isLoading, ...props}) => {
    return (
        <div className={styles.spButtonForm}>
            <button className={styles.spButton} onClick={onClick} disabled={isLoading}>
                {
                    isLoading ? 
                    <ClipLoader color='white' size={15} />
                    : 
                    <>
                        {
                            icon? icon: <></>
                        }
                        {text}
                    </>
                }
            </button>
        </div>
    )
}

export const GoLiveButton = ({text, icon=null, onClick, isLoading, ...props}) => {
    return (
        <div className={styles.liveButtonForm}>
            <button className={styles.spButton} onClick={onClick} disabled={isLoading}>
                {
                    isLoading ? 
                    <ClipLoader color='white' size={15} />
                    : 
                    <>
                        {
                            icon? icon: <></>
                        }
                        {text}
                    </>
                }
            </button>
        </div>
    )
}

export const ViewAllBtn = ({...props}) => {
    return (
        <div className={styles.viewAll}> View all </div>
    )
}

export const SmallDestructiveButton = ({text, icon=null, ...props}) => {
    return (
        <div className={styles.sdButtonForm}>
            <button className={styles.sdButton}>
                {
                    icon? icon: <></>
                }
                {text}
            </button>
        </div>
    )
}

export const BackBtn = ({onClick=noop, ...props}) => {

    const navigate = useNavigate();

    const handleBackAction = () => {
        if(onClick == noop) {
            navigate(-1);
        } else {
            onClick();
        }
    }

    return (
        <div onClick={handleBackAction}> 
            <button className='btn-back'>
                <Left width={24} height={24} />
            </button>
        </div>
    )
}

export const NormalTetriaryBtn = ({text, isLoading = false, onClick=null, ...props}) => {
    return (
        <div className={styles.ntBtnWrapper}>
            <button className={styles.ntBtn} onClick={onClick} disabled={isLoading}>
                {
                    isLoading ? 
                    <ClipLoader color='white' size={20} />
                    : <>{text}</>
                }
                </button>
        </div>
    )
}

export const NormalDestructiveBtn = ({text, isLoading=false, onClick=null, ...props}) => {
    return (
        <div className={styles.ndBtnWrapper}>
            <button className={styles.ndBtn} onClick={onClick} disabled={isLoading}>
                {
                    isLoading ? 
                    <ClipLoader color='white' size={20} />
                    : <>{text}</>
                }
                </button>
        </div>
    )
}

export const SmallTetriaryBtn = ({text, icon=null, onClick = null, ...props}) => {
    return (
        <div className={styles.stButtonForm}>
            <button className={styles.stButton} onClick={onClick}>
                {
                    icon? icon: <></>
                }
                {text}
            </button>
        </div>
    )
}

export const SmallDestructiveBtn = ({text, icon=null, onClick=null, ...props}) => {
    return (
        <div className={styles.sdButtonForm}>
            <button className={styles.sdButton} onClick={onClick}>
                {
                    icon? icon: <></>
                }
                {text}
            </button>
        </div>
    )
}

export const RadioButtonGroup = ({label, items, ...props}) => {
    return (
        <div className={styles.radioBtnGroup}>
            {
                label ?
                <span>{label}</span>:<></>
            }
            {
                items?
                items.map((item, index) => {
                    return (
                        <label key={index} className={styles.container}>
                            {item.label}
                            <input type="radio" name="radio" onChange={() =>{}} />
                            <span className={styles.checkmark}></span>
                        </label>
                    )
                })
                :<></>
            }
        </div>
    )
}