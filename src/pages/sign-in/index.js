import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation } from 'react-query'

import { LogoText } from 'ui/svg/logo';
import image1 from 'assets/png/Image1.png';
import { H1 } from 'ui/text';
import { DefaultInput, PasswordInput } from 'ui/input';
import styles from 'pages/sign-in/index.module.scss';
import { NormalPrimaryButton } from 'ui/buttons';

import useSignIn from 'hooks/auth/useSignIn';
import { Warning } from 'ui/svg/icon';
import { signIn, signinResolver } from 'shared/api';

import { AuthContext } from 'context/AuthProvider';
import { isValidEmail, isValidPassword } from 'utils/checkValidation';

const SignIn = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [onShowPass, setOnShowPass] = useState(false);

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [blockError, setBlockError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(true);

    const { signIn, isSignedIn } = useContext(AuthContext);

    const initError = () => {
        setUsernameError("");
        setPasswordError("");
        setShowEmailError(true);
        setBlockError(false);
    }

    useEffect(() => {
        if (isSignedIn) {
            navigate('/');
        }
    }, [])

    const { signInRequest, signInLoading, signInError } = useSignIn({
        onSuccess: (data) => {
            // process jwt token
            signIn(data.user);
            navigate('/');
        },
        onError: (error) => {
            if(error.status == 400) {
                // setUsernameError(error.data.msg);
                setUsernameError("1");
                setShowEmailError(false);
                setPasswordError("Invalid email or password");
            }
            if(error.status == 401) {
                // setPasswordError(error.data.msg);
                setUsernameError("1");
                setShowEmailError(false);
                setPasswordError("Invalid email or password");
            }
            if(error.status == 402) {
                setBlockError(true);
            }
        }
    })

    const handleUsernameChange = (e) => {
        initError();
        setUsername(e.target.value);
    }

    const handleClearUsername = () => {
        initError();
        setUsername("");
    }

    const handlePasswordChange = (e) => {
        initError();
        setPassword(e.target.value);
    }

    const handleOnShow = () => {
        if(onShowPass) setOnShowPass(false);
        else setOnShowPass(true);
    }

    const handleLoginRequest = () => {
        let errorCnt = 0;
        //login action
        if(!isValidEmail(username)) {
            if(username=="") setUsernameError("Please fill in this field");
            else setUsernameError("Invalid email format");
            errorCnt ++;
        }
        // if(!isValidPassword(password)) {
        //     setPasswordError("Invalid password format");
        //     errorCnt ++;
        // }
        if(password == "") {
            setPasswordError("Please fill in this field");
            errorCnt ++;
        }

        if(errorCnt > 0) return;

        signInRequest({email: username, password});
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleLoginRequest();
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
                <div className='login-form'>
                    <div className='login-title'>
                        <H1 value='Welcome' />
                    </div>
                    <div className='login-field'>
                        <DefaultInput 
                            name="email"
                            placeholder='Email' 
                            value={username} 
                            onChange={handleUsernameChange} 
                            reset={handleClearUsername} 
                            error={usernameError}
                            showError={showEmailError}
                            onKeyDown={handleKeyDown}
                        />
                        <PasswordInput 
                            name="password"
                            placeholder='Password' 
                            value={password}
                            onChange={handlePasswordChange}
                            onShow={onShowPass}
                            handleShow={handleOnShow}
                            error={passwordError}
                            onKeyDown={handleKeyDown}
                        />
                        <div style={{display:'flex', flexDirection: 'column', width: '100%'}}>
                            {
                                blockError ?
                                <div className={styles.errorMsgWrapper}>
                                    <div>
                                        <Warning color={'#FF3535'} width={23} height={23} />
                                    </div>
                                    <div>
                                        <span className={styles.errorMsg}>Seems like you've been blocked by an Admin. If you think there is a mistake, please contact <a style={{color: '#946EFF'}}>mail@borsahero.com</a></span>
                                    </div>
                                </div> :<> </>
                            }
                            <div className={styles.forgotPass}>
                                <Link to='/forgot-password' className='primary-link' > Forgot password? </Link>
                            </div>
                        </div>
                        
                        <NormalPrimaryButton text="Log in" onClick={handleLoginRequest} isLoading = {signInLoading} />
                    </div>
                    <div style={{marginTop: '198px'}}>
                        <span className="secondary-text">New here?</span> <Link to="/sign-up" className='primary-link'>Create an account</Link>
                    </div>
                </div>
            </div>
            <div className='image'>
                <img src={image1} alt="signin logo"/>
            </div>
        </div>
    )
}

export default SignIn