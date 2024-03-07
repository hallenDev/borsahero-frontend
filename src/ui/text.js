import styles from 'ui/text.module.scss';
import { Warning, Check } from 'ui/svg/icon';

export const H1 = ({value}) => {
    return (
        <div style={{fontFamily:'DM Sans', fontWeight: 500, lineHeight:'66px', color:'white', fontSize:'60px'}}>
            {value}
        </div>
    )
}

export const Label = ({value}) => {
    return (
        <div style={{height:'16px'}}>
            <span style={{fontFamily:'DM Sans', fontWeight: 400, fontSize: '14px', lineHeight: '16px', color: 'white'}}>
                {value}
            </span>
        </div>
    )
}

export const ErrorMsg = ({value }) => {
    return (
        value != "" ? 
        <div className={styles.errorMsgWrapper}>
            <div className={styles.warningIcon}>
                <Warning color={'#FF3535'} width={16} height={16} />
            </div>
            <span className={styles.errorMsg}>{value}</span>
        </div>
        : <></>
    )

}

export const SuccessMsg = ({value }) => {
    return (
        value != "" ? 
        <div className={styles.errorMsgWrapper}>
            <div>
                <Check color={'#85FF3A'} width={23} height={23} />
            </div>
            <div>
                <span className={styles.successMsg}>{value}</span>
            </div>
        </div>
        : <></>
    )

}

export const H2 = ({value, ...props}) => {
    return (
        <div className={styles.H2}>
            {value}
        </div>
    )
}

export const H3 = ({value, color="white", ...props}) => {
    return (
        <div className={styles.H3} style={{color:`${color}`}}>
            {value}
        </div>
    )
}

export const SecondaryText = ({value, color="white", ...props}) => {
    return (
        <div className={styles.secondaryText} style={{color:`${color}`}}>
            {value}
        </div>
    )
}

export const PrimaryText = ({value, ...props}) => {
    return (
        <div className={styles.primaryText}>
            {value}
        </div>
    )
}

export const PrimaryBold = ({value, ...props}) => {
    return (
        <div className={styles.primaryBold}>
            {value}
        </div>
    )
}

export const SecondaryLabel = ({value, ...props}) => {
    return (
        <div className={styles.secondaryLabel}>
            {value}
        </div>
    )
}

export const PrimaryGreyText = ({value, ...props}) => {
    return (
        <div className={styles.primaryGreyText}>
            <span>{value}</span>
        </div>
    )
}

export const SecondaryGreyText = ({value, ...props}) => {
    return (
        <div className={styles.secondaryGreyText}>
            <span>{value}</span>
        </div>
    )
}

export const SecondaryLinkText = ({value, ...props}) => {
    return(
        <div className={styles.secondaryLinkText}>
            <span>{value}</span>
        </div>
    )
}

export const TetriaryGreyText = ({value, ...props}) => {
    return(
        <div className={styles.tetriaryGreyText}>
            <span>{value}</span>
        </div>
    )
}

export const SecondaryBold = ({value, props}) => {
    return (
        <div className={styles.secondaryBold}>
            <span>{value}</span>
        </div>
    )
}