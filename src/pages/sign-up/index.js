import { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { debounce } from "lodash"

import { LogoText } from 'ui/svg/logo';
import { Left } from 'ui/svg/icon';
import image1 from 'assets/png/Image1.png';
import { H1 } from 'ui/text';
import { DefaultInput, Checkbox, PasswordInput } from 'ui/input';
import VerifyCodeInput from 'components/verifyCodeInput';
import AvatarUpload from 'components/AvatarUpload';
import styles from 'pages/sign-up/index.module.scss';
import { NormalPrimaryButton } from 'ui/buttons';
import { ErrorMsg } from 'ui/text';
import Terms from 'components/Terms';

import useRegister from 'hooks/auth/useRegister';
import useRegisterOTP from 'hooks/auth/useRegisterOTP';
import useValidateUsername from 'hooks/user/useValidateUsername';
import useUpdateProfile from 'hooks/user/useUpdateProfile';
import { isValidPassword, isValidEmail } from 'utils/checkValidation';
import PasswordRulePad from 'ui/PasswordRulePad';


import { AuthContext } from 'context/AuthProvider'

const SignUp = () => {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [onShowPass, setOnShowPass] = useState(false);
    const [tmpMail, setTmpMail] = useState("");
    const [tmpPass, setTmpPass] = useState("");

    const [verifyCode, setVerifyCode] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    
    const [agreedTerm, setAgreedTerm] = useState(false);
    const [errorAgreeTerm, setErrorAgreeTerm] = useState("");

    const [isPassMatched, setIsPassMatched] = useState("");
    const [mailError, setMailError] = useState("");
    const [codeError, setCodeError] = useState("");

    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [validUsername, setValidUsername] = useState(false);

    const [countdown, setCountdown] = useState(0);

    const [termsOpen, setTermsOpen] = useState(false);

    const { signIn, userData, updateUserData, isSignedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isSignedIn) {
            navigate('/');
        }
    }, [])

    const updateCountdown = () => {
        setCountdown(prevState => {
            return prevState == 0 ? prevState : prevState - 1;
        })
    }

    useEffect(() => {
        const countdownTimer = setInterval(() => updateCountdown(), 1000);

        return () => clearInterval(countdownTimer);
    }, [])

    const handleTimerClick = () => {
        if(countdown > 0) {
            // setCountdown(0);
            return;
        }

        console.log('resend code');
        registerRequest({email: mail, password});
    }

    const handleAgreeTerms = () => {
        setErrorAgreeTerm("");
        if(agreedTerm) setAgreedTerm(false);
        else setAgreedTerm(true);
    }

    const { registerRequest, registerLoading } = useRegister({
        onSuccess: () => {
            if(countdown == 0) setCountdown(60);
            setStep(2);
        },
        onError: (error)  => {
            setMailError(error);
        }
    });

    const { registerOTPRequest, registerOTPLoading } = useRegisterOTP({
        onSuccess: (data) => {
            signIn(data.user);
            navigate("/set-up");
        },
        onError: (error)  => {
            setCodeError(error);
        }
    })

    const { validateUsernameRequest } = useValidateUsername({
        onSuccess: (data) => {
            setValidUsername(true);
        },
        onError: (error) => {
            setValidUsername(false)
            setUsernameError("It seems someone beat you to that nickname");
        }
    })

    const { updateProfileRequest, updateProfileLoading } = useUpdateProfile({
        onSuccess: (data) => {
            // update use userData
            updateUserData(data.user);
            navigate('/');
        },
        onError: (error) => {

        }
    })

    const handleRegisterAction = () => {
        
        // check agree terms and conditions
        let errorCnt = 0;
        if(agreedTerm == false) {
            setErrorAgreeTerm("Please agree to Terms & Conditions to proceed registration");
            errorCnt ++;
        }

        // check password match
        if(!isValidPassword(password)) {
            setIsPassMatched("Invalid password");
            errorCnt ++;
        }
        
        if(!isValidEmail(mail)) {
            setMailError("Invalid email");
            errorCnt ++;
        }

        if(errorCnt > 0) return;
        if(tmpMail == mail && tmpPass == password && countdown > 0) {
            setStep(2);
        } else {
            setTmpMail(mail);
            setTmpPass(password);
            registerRequest({email: mail, password});
        }
    }

    const handleRegisterOTPAction = () => {
        registerOTPRequest({email: mail, otpCode: verifyCode});
    }

    const handleMailChange = (e) => {
        setMailError("");
        setMail(e.target.value);
    }

    const handleResetMail = () => {
        setMailError("");
        setMail('');
    }

    const setProfileRequest = () => {
        let errorCnt = 0;
        if(firstName == "") {
            setFirstnameError("First name should not be empty");
            errorCnt ++;
        }
        if(lastName == "") {
            setLastnameError("Last name should not be empty");
            errorCnt ++;
        }

        if(username == "") {
            // setUsernameError("Username should not be empty");
            errorCnt ++;
        }

        if(errorCnt > 0) {
            setUsernameError("Please fill in all the required fields");
        }

        if(errorCnt == 0 && validUsername == false) {
            return;
        }

        if(errorCnt > 0) return;

        updateProfileRequest({userData, first_name: firstName, last_name: lastName, username});        
    }

    const handlePasswordChange = (e) => {
        setIsPassMatched("");
        setPassword(e.target.value);
    }

    const handleOnShow = () => {
        if(onShowPass == true) setOnShowPass(false);
        else setOnShowPass(true);
    }

    const handleVerifyCodeChange = (value) => {
        setCodeError("");
        setVerifyCode(value);
    }

    const handleFirstNameChange = (e) => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setFirstnameError("");
        setFirstName(e.target.value);
    }

    const handleResetFirstName = () => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setFirstnameError("");
        setFirstName("");
    }

    const handleLastNameChange = (e) => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setLastnameError("");
        setLastName(e.target.value);
    }

    const handleResetLastName = () => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setLastnameError("");
        setLastName("");
    }

    const validateUsername = async (_username, _userData) => {
        if(_username == "") return;
        validateUsernameRequest({userData: _userData, username: _username});
    }

    const debouncedValidateUsername = useRef(
        debounce(async (value, _userData) => {
          await validateUsername(value, _userData);
        }, 500)
      ).current;

    const handleUsernameChange = (e) => {
        debouncedValidateUsername(e.target.value, userData);
        setUsernameError("");
        setValidUsername(false);
        setUsername(e.target.value);
    }

    const handleResetUsername = () => {
        debouncedValidateUsername("", userData);
        setUsernameError("");
        setValidUsername(false);
        setUsername("");
    }

    useEffect(() => {
        return () => {
            debouncedValidateUsername.cancel();
        };
    }, [debouncedValidateUsername]);

    const handleBackAction = () => {
        setStep(1);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            if(step == 1) handleRegisterAction();
            if(step == 3) setProfileRequest();
        }
    }

    return (
        <>
            <div className='login'>
                <div className='content-login'>
                    <div className='logo-text'>
                        <Link to='/'>
                            <LogoText width={185.13} height={32}/>
                        </Link>
                    </div>
                    <div className={styles.backBtnContent}> 
                        {
                            step == 2 ?
                            <button className='btn-back' onClick={handleBackAction}>
                                <Left width={24} height={24} />
                            </button>
                            :
                            <div style={{height:'10px'}}></div>
                        }
                        
                    </div>
                    {
                        step == 1 ?
                        <div className='login-form'>
                            <div className='login-title'>
                                <H1 value='Sign Up' />
                            </div>
                            <div className='login-field'>
                                <DefaultInput 
                                    placeholder='Email' 
                                    value={mail} 
                                    onChange={handleMailChange} 
                                    reset={handleResetMail} 
                                    error={mailError}
                                    onKeyDown={handleKeyDown}
                                />
                                <PasswordInput 
                                    placeholder='Password' 
                                    type='password' 
                                    onShow={onShowPass}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    handleShow={handleOnShow}
                                    error={isPassMatched}
                                    onKeyDown={handleKeyDown}
                                />

                                {
                                    password.length > 0 && 
                                    <PasswordRulePad value={password} />
                                }
                                
                                <div className={styles.terms}>
                                    <Checkbox onChange={handleAgreeTerms} value={agreedTerm} />
                                    <div>
                                        <span className="secondary-text">
                                            Agree with <button onClick={() => setTermsOpen(true)} className='primary-link'>Terms and Conditions</button> 
                                            <br/>and <button onClick={() => setTermsOpen(true)} className='primary-link'>Privacy Policy</button></span> 
                                    </div>
                                </div>
                                <ErrorMsg value={errorAgreeTerm} />
                                <NormalPrimaryButton text="Create account" onClick={handleRegisterAction} isLoading={registerLoading} />
                            </div>
                            {
                                password.length == 0 && 
                                <div style={{height:"50px"}}></div>
                            }
                            <div className={styles.bottomLine}>
                                <span className="secondary-text">Already have an account?</span> <Link to="/sign-in" className='primary-link'>Sign in</Link>
                            </div>
                        </div>
                        :<> </>
                    }
                    {
                        step == 2 ?
                        <div className='login-form'>
                            <div className='login-title'>
                                <span className='txt-h2 white'>Confirm your email</span>
                                <div className={styles.confirmSubscription}>
                                    <span className='txt-primary white-20'> Please enter the code sent to <br/>{mail}</span>
                                </div>
                            </div>
                            <div className='login-field'>
                                <VerifyCodeInput onChange={handleVerifyCodeChange} error={codeError} onEnter={handleRegisterOTPAction} />
                                <div style={{display:'flex', flexDirection:'row-reverse', width:'100%'}}>
                                    <div onClick={handleTimerClick} style={{cursor: 'pointer'}}>
                                    <span className={countdown > 0 ? 'secondary-link':'primary-link'} > 
                                    {
                                        countdown > 0 ?
                                        `${countdown <= 60 ? `Resend code in `: ``} ${parseInt(countdown / 60)}:${('0' + countdown % 60).slice(-2)}`
                                        : `Resend code`
                                    }
                                        {}
                                    </span>
                                    </div>
                                </div>
                                <NormalPrimaryButton text="Confirm" onClick={handleRegisterOTPAction} isLoading={registerOTPLoading} />
                            </div>
                        </div>
                        :<> </>
                    }
                    {
                        step == 3 ?
                        <div className={styles.setProfileForm}>
                            <div className='login-title'>
                                <span className='txt-h2 white'>Set up your Profile</span>
                            </div>
                            <AvatarUpload />
                            <div className='login-field'>
                                <DefaultInput 
                                    placeholder='First name' 
                                    value={firstName}
                                    onChange={handleFirstNameChange}
                                    reset={handleResetFirstName}
                                    error={firstnameError}
                                    showError={false}
                                    limit={64}
                                    onKeyDown={handleKeyDown}
                                />
                                <DefaultInput 
                                    placeholder='Last name' 
                                    value={lastName}
                                    onChange={handleLastNameChange}
                                    reset={handleResetLastName}
                                    error={lastnameError}
                                    showError={false}
                                    limit={64}
                                    onKeyDown={handleKeyDown}
                                />
                                <DefaultInput 
                                    placeholder='Username' 
                                    value={username}
                                    onChange={handleUsernameChange}
                                    reset={handleResetUsername}
                                    error={usernameError}
                                    success={validUsername}
                                    limit={64}
                                    onKeyDown={handleKeyDown}
                                />
                                <NormalPrimaryButton text="Ready to explore" onClick={setProfileRequest} isLoading={updateProfileLoading} />
                            </div>
                        </div>
                        :<> </>
                    }
                </div>
                <div className='image'>
                    <img src={image1} alt="signin logo"/>
                </div>
            </div>
            {
                termsOpen == true ?
                <Terms setIsOpen={setTermsOpen} />
                : <></>
            }
        </>
    )
}

export default SignUp