import styles from './PasswordRulePad.module.scss';
import { Close, Check } from 'ui/svg/icon';
import { 
    checkLengthValidation, 
    isContainLowerCase, 
    isContainUpperCase,
    isContainNumber,
    isContainSpecialCharacter
 } from 'utils/checkValidation';

const PasswordRulePad = ({value}) => {
    return (
        <div className={styles.pad}>
            <div className={styles.item}>
                {
                    checkLengthValidation(value, 8, 64) ?
                    <Check width={20} height={20} color={"#85FF3A"} />
                    :
                    <Close width={20} height={20} />
                }
                {/* <Close width={16} height={16} /> */}
                <span>8-64 characters,</span>
            </div>
            <div className={styles.item}>
                {
                    isContainLowerCase(value) ?
                    <Check width={20} height={20} color={"#85FF3A"} />
                    :
                    <Close width={20} height={20} />
                }
                <span>1+ lowercase latin character (a-z),</span>
            </div>
            <div className={styles.item}>
                {
                    isContainUpperCase(value) ?
                    <Check width={20} height={20} color={"#85FF3A"} />
                    :
                    <Close width={20} height={20} />
                }
                <span>1+ uppercase latin character (A-Z),</span>
            </div>
            <div className={styles.item}>
                {
                    isContainNumber(value) ?
                    <Check width={20} height={20} color={"#85FF3A"} />
                    :
                    <Close width={20} height={20} />
                }
                <span>1+ number (0-9),</span>
            </div>
            <div className={styles.item}>
                {
                    isContainSpecialCharacter(value) ?
                    <Check width={20} height={20} color={"#85FF3A"} />
                    :
                    <Close width={20} height={20} />
                }                
                <span>1+ special character (^?!=.*[]()\/@$%#&_-)</span>
                
            </div>

        </div>
    )
}

export default PasswordRulePad;