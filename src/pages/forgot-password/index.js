import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { LogoText } from 'ui/svg/logo';
import { Left } from 'ui/svg/icon';
import image1 from 'assets/png/Image1.png';
import { DefaultInput, PasswordInput } from 'ui/input';
import { NormalPrimaryButton } from 'ui/buttons';
import VerifyCodeInput from 'components/verifyCodeInput';
import styles from 'pages/forgot-password/index.module.scss';

import useForgotPassword from 'hooks/auth/useForgotPassword';
import useResetPassOTP from 'hooks/auth/useResetPassOTP';
import useResetPassword from 'hooks/auth/useResetPassword';
import { isValidEmail, isValidPassword } from 'utils/checkValidation';

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [mail, setMail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [onShow, setOnShow] = useState("");
    const [tmpMail, setTmpMail] = useState("");

    const [mailError, setMailError] = useState("");
    const [codeError, setCodeError] = useState("");
    const [isPassMatched, setIsPassMatched] = useState("");

    const [countdown, setCountdown] = useState(0);

    const { forgotPassRequest, forgotPassLoading, forgotPassError } = useForgotPassword({
        onSuccess: () => {
            setCountdown(60);
            setStep(2);
        },
        onError: (error) => {
            setMailError(error);
        }
    });

    const { resetPassOTPRequest, resetPassOTPLoading, resetPassOTPError } = useResetPassOTP({
        onSuccess: () => {
            setStep(3);
        },
        onError: (error) => {
            setCodeError(error);
        }
    })

    const { resetPasswordRequest, resetPasswordLoading, resetPasswordError } = useResetPassword({
        onSuccess: () => {
            navigate('/sign-in');
        },
        onError: (error) => {

        }
    })

    const updateCountdown = () => {
        setCountdown(prevState => {
            return prevState == 0 ? prevState : prevState - 1;
        })
    }

    useEffect(() => {
        const countdownTimer = setInterval(() => updateCountdown(), 1000);

        return () => clearInterval(countdownTimer);
    }, [])

    const handleMailChange = (e) => {
        setMailError("");
        setMail(e.target.value);
    }

    const handleMailReset = () => {
        setMailError("");
        setMail("");
    }

    const handleVerifyCodeChange = (code) => {
        setCodeError("");
        setVerifyCode(code);
    }

    const savePasswordRequest = () => {
        let errorCnt = 0;

        if(!isValidPassword(password)) {
            setIsPassMatched("Invalid password format");
            errorCnt ++;
        }
        if(confirmPass != password) {
            setIsPassMatched("Passwords do not match. Please try again");
            errorCnt ++;
        }

        if(errorCnt > 0) return;
        resetPasswordRequest({email: mail, password, otpCode: verifyCode});
    }

    const handlePasswordChange = (e) => {
        setIsPassMatched("");
        setPassword(e.target.value);
    }
    const handleConfirmPassChange = (e) => {
        setIsPassMatched("");
        setConfirmPass(e.target.value);
    }

    const handleOnShow = () => {
        if(onShow == true) setOnShow(false);
        else setOnShow(true);
    }

    const handleForgotAction = () => {
        let errorCnt = 0;
        if(!isValidEmail(mail)) {
            errorCnt ++;
            setMailError("Invalid email format");
        }

        if(errorCnt > 0) return;

        if(tmpMail == mail && countdown > 0) {
            setStep(2);
        } else {
            setTmpMail(mail);
            forgotPassRequest({email: mail});
        }
    }

    const handleResetPassOTPAction = () => {
        resetPassOTPRequest({email: mail, otpCode: verifyCode});
    }

    const handleTimerClick = () => {
        if(countdown > 0) {
            // setCountdown(0);
            return;
        }

        // console.log('resend code');
        forgotPassRequest({email: mail});
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            if(step == 1) handleForgotAction();
            if(step == 3) savePasswordRequest();
        }
    }

    const handleBackAction = () => {
        if(step == 1) {
            navigate('/sign-in');
        } else {
            setStep(step => step - 1);
        }
    }

    return (
        <div className='login'>
            <div className='content-login'>
                <div className='logo-text'>
                    <Link to='/'>
                        <LogoText width={185.13} height={32}/>
                    </Link>
                </div>
                <div className={styles.backBtnContent}> 
                    {
                        step == 3 ?
                        <div style={{height:'30px'}}></div>
                        :
                        <button className='btn-back' onClick={handleBackAction}>
                            <Left width={24} height={24} />
                        </button>
                    }
                    
                </div>
                <div className='forgot-form'>
                    {
                        step == 1 ?
                        <>
                            <div className='login-title'>
                                <span className='txt-h2 white'>Forgot Password?</span>
                                <div className={styles.subscription}>
                                    <span className='txt-primary white-20'> That’s okay, it happens! Enter your email address below, and we will send you a letter with a link to reset it.</span>
                                </div>
                            </div>
                            <div className='login-field'>
                                <DefaultInput 
                                    placeholder='Email'
                                    value={mail}
                                    onChange={handleMailChange}
                                    reset={handleMailReset}
                                    error={mailError}
                                    onKeyDown={handleKeyDown}
                                />
                                <NormalPrimaryButton 
                                    onClick={handleForgotAction}
                                    text="Confirm"
                                    isLoading={forgotPassLoading}
                                />

                            </div>
                        </>
                        :<> </>
                    }
                    {
                        step == 2 ? 
                        <>
                            <div className='login-title'>
                                <span className='txt-h2 white'>Reset password</span>
                                <div style={{width:'328px', textAlign:'center'}}>
                                    <span className='txt-primary white-20'> Please enter the code sent to <br/>{mail}</span>
                                </div>
                            </div>
                            <div className='login-field'>
                                <VerifyCodeInput value="123456" onChange={handleVerifyCodeChange} error={codeError} onEnter={handleResetPassOTPAction} />
                                <div style={{display:'flex', flexDirection:'row-reverse', width:'100%'}}>
                                    <div onClick={handleTimerClick} style={{cursor: 'pointer'}}>
                                    <span className={countdown > 0 ? 'secondary-link':'primary-link'} > 
                                    {
                                        countdown > 0 ?
                                        `${countdown <= 60 ? `Resend code in `: ``} ${('0' + parseInt(countdown / 60)).slice(-2)}:${('0' + countdown % 60).slice(-2)}`
                                        : `Resend code`
                                    }
                                        {}
                                    </span>
                                    </div>
                                </div>
                                <NormalPrimaryButton 
                                    onClick={handleResetPassOTPAction}
                                    text="Confirm"
                                    isLoading={resetPassOTPLoading}
                                />
                            </div>
                        </>
                        :
                        <></>
                    }
                    {
                        step == 3 ? 
                        <>
                            <div className='login-title'>
                                <span className='txt-h2 white'>Set new password</span>
                            </div>
                            <div className='login-field'>
                                <PasswordInput 
                                    placeholder='Password'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onShow={onShow}
                                    handleShow={handleOnShow}
                                    error={isPassMatched}
                                    showError={false}
                                    onKeyDown={handleKeyDown}
                                />
                                <PasswordInput 
                                    placeholder='Confirm password'
                                    value={confirmPass}
                                    onChange={handleConfirmPassChange}
                                    onShow={onShow}
                                    handleShow={handleOnShow}
                                    error={isPassMatched}
                                    onKeyDown={handleKeyDown}
                                />
                                
                                <NormalPrimaryButton 
                                    onClick={savePasswordRequest}
                                    text="Save"
                                    isLoading={resetPasswordLoading}
                                /> 
                            </div>
                            <div className={styles.bottomLine}>
                                <span className="secondary-text">Have another account?</span> <Link to="/sign-in" className='primary-link'>Sign in</Link>
                            </div>
                        </>
                        :
                        <></>
                    }
                </div>
            </div>
            <div className='image'>
                <img src={image1} alt="signin logo"/>
            </div>
        </div>
    )
}

export default ForgotPassword