import { useState } from 'react';
import { Label } from 'ui/text'
import { Close, See, Hide } from 'ui/svg/icon';
import styles from 'ui/input.module.scss';
import { ErrorMsg, SuccessMsg } from 'ui/text';
import noop from 'utils/noop';

export const DefaultInput = ({label, type, placeholder, value, onChange=noop, reset, error = "", success = false, showError=true, limit=0, onKeyDown=noop, name="", ...props}) => {
    const handleChange = (e) => {
        if(e.target.value?.length > limit && limit > 0) {
            return;
        }
        onChange(e);
    }
    return (
        <div className={styles.defaultInputForm}>
            {
                label? <Label value={label} />:<></>
            }
            <div className={styles.defaultInputWrapper}>
                {
                    value !== "" ?
                    <button className={styles.defaultInputIcon} onClick={reset} name={name}><Close width={20} height={20} color={"white"} /></button>
                    :<></>
                }
                
                <input 
                    type={type? type:'input'} 
                    placeholder={placeholder ? placeholder: 'input'} 
                    className={error != "" ? styles.defaultInputError:styles.defaultInput} 
                    value={value} 
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    name={name}
                />
            </div>
            {
                (error != "" && showError) ?
                <ErrorMsg value={error} />
                :<></>
            }
            {
                success == true && error == "" ?
                <SuccessMsg value="Your choosen username is one of a kind." />
                : <></>
            }
        </div>
    )
}

export const PrimaryInput = ({label, type, placeholder, value, onChange=noop, reset, error = "", success = false, limit=0, showError=true, onKeyDown=noop, name="", ...props}) => {
    const handleChange = (e) => {
        if(e.target.value?.length > limit && limit > 0) {
            return;
        }
        onChange(e);
    }
    return (
        <div className={styles.primaryInputForm}>
            {
                label? <Label value={label} />:<></>
            }
            <div className={styles.defaultInputWrapper}>
                {
                    value !== "" && value ?
                    <button className={styles.defaultInputIcon} onClick={reset}><Close width={20} height={20} color={"white"} /></button>
                    :<></>
                }
                
                <input 
                    type={type? type:'input'} 
                    placeholder={placeholder ? placeholder: 'input'} 
                    className={error != "" ? styles.defaultInputError:styles.primaryInput} 
                    value={value} 
                    onChange={handleChange}
                    onKeyDown={onKeyDown}
                    name={name}
                />
            </div>
            {
                error != "" && showError ?
                <ErrorMsg value={error} />
                :<></>
            }
            {
                success == true ?
                <SuccessMsg value="Your choosen username is one of a kind." />
                : <></>
            }
        </div>
    )
}

export const PasswordInput = ({label, type, placeholder, value, onChange, error = "", showError = true, onKeyDown=noop, name="", ...props}) => {
    const [onShow, setOnShow] = useState(false);
    const handleShow = () => {
        setOnShow(prev => {
            return !prev;
        });
    }
    return (
        <div className={styles.defaultInputForm}>
            {
                label? <Label value={props.label} />:<></>
            }
            <div className={styles.defaultInputWrapper}>
                {
                    value != "" ?
                    <button className={styles.defaultInputIcon} onClick={handleShow}>
                        {
                            onShow == false ?
                            <See width={20} height={20} />
                            :
                            <Hide width={20} height={20} />
                        }
                    </button>
                    :<></>
                }
                    
                <input 
                    type={onShow == false? 'password':'input'} 
                    placeholder={placeholder ? placeholder: 'input'} 
                    className={error != "" ? styles.defaultInputError:styles.defaultInput} 
                    value={value} 
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    name={name}
                />
            </div>
            {
                
                (error !="" && showError == true) ?
                <ErrorMsg value={error} />
                :<></>
            }
        </div>
    )
}

export const CircleInput = ({value, onChange, onKeyDown, index, error = ""}) => {
    return (
        <div className={styles.circleInputForm}>
            <input 
                className={error == ""? "circle-input":"circle-input circle-input-error"}
                onChange={(e) => onChange(e, index)}
                onKeyDown={(e) => onKeyDown(e, index)}
                value={value}
            />
        </div>
    )
}

export const Checkbox = ({value, onChange, ...props}) => {

    return (
        <label className={styles.checkbox}>
            <input type='checkbox' checked={value} onChange={onChange} />
            <span className={styles.checkmark}></span>
        </label>
    )
}

export const BigField = ({label, value="", placeholder, limit=1024, error="", onChange=noop, name="", ...props}) => {

    const handleChange = (e) => {
        if (e.target.value?.length > limit) {
            return;
        }
        onChange(e);
    }

    return (
        <div className={styles.bigFieldWrapper}>
            {
                label ?
                <div style={{width:'100%'}}><span>{label}</span></div> :<></>
            }
            <textarea 
                rows={5} 
                placeholder={placeholder ?? ""} 
                onChange={handleChange} 
                className={error == "" ? styles.bigField: styles.bigFieldError} 
                value={value} 
                name={name}
            />
            <div style={{display:'flex', flexDirection:'row-reverse', justifyContent: 'space-between', width:'100%'}}>
                <div className={styles.limitLabel}>{value.length}/{limit}</div>
                {
                    error != "" ?
                    <ErrorMsg value={error} />
                    :<></>
                }
            </div>
            
        </div>
        
    )
}