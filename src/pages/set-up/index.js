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
import styles from './index.module.scss';
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

const Setup = () => {
    
    const navigate = useNavigate();
    
    const { signIn, userData, updateUserData, isSignedIn } = useContext(AuthContext);
    const [firstName, setFirstName] = useState(userData?.first_name ?? "");
    const [lastName, setLastName] = useState(userData?.last_name ?? "");
    const [username, setUsername] = useState(userData?.username ?? "");

    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emptyError, setEmptyError] = useState("");
    const [imageError, setImageError] = useState("");
    const [validUsername, setValidUsername] = useState(userData?.username != "" ? true: false);
    const [imageSelect, setImageSelect] = useState(false);


    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if(imageSelect) setImageError("");
    }, [imageSelect])

    useEffect(() => {
        if (!isSignedIn) {
            navigate('/sign-in');
        }
        if(username == "") setValidUsername(false);
        else setValidUsername(true);
    }, [])

    const { validateUsernameRequest } = useValidateUsername({
        onSuccess: (data) => {
            setValidUsername(data.status);
            if(data.status == false) {
                setUsernameError("It seems someone beat you to that nickname");    
            }
        },
        onError: (error) => {
            setValidUsername(false);
            setUsernameError("Error while validating username");
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
            setUsernameError("Error");
            errorCnt ++;
        }

        

        if(errorCnt > 0) {
            setEmptyError("Please fill in all the required fields");
        }

        if(imageSelect == false) {
            setImageError("Please upload avatar.");
            return;
        }

        if(errorCnt == 0 && validUsername == false) {
            return;
        }

        if(errorCnt > 0) return;

        updateProfileRequest({userData, first_name: firstName, last_name: lastName, username});        
    }

    const handleFirstNameChange = (e) => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setFirstnameError("");
        setFirstName(e.target.value);
        setEmptyError("");
    }

    const handleResetFirstName = () => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setFirstnameError("");
        setFirstName("");
        setEmptyError("");
    }

    const handleLastNameChange = (e) => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setLastnameError("");
        setLastName(e.target.value);
        setEmptyError("");
    }

    const handleResetLastName = () => {
        if(!validUsername && username != "") {
            setUsernameError("It seems someone beat you to that nickname");
        }
        else setUsernameError("");
        setLastnameError("");
        setLastName("");
        setEmptyError("");
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
        setEmptyError("");
    }

    const handleResetUsername = () => {
        debouncedValidateUsername("", userData);
        setUsernameError("");
        setValidUsername(false);
        setUsername("");
        setEmptyError("");
    }

    useEffect(() => {
        return () => {
            debouncedValidateUsername.cancel();
        };
    }, [debouncedValidateUsername]);

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            setProfileRequest();
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
                    {/* <div className={styles.backBtnContent}> 
                        {
                            step == 2 ?
                            <button className='btn-back' onClick={handleBackAction}>
                                <Left width={24} height={24} />
                            </button>
                            :
                            <div style={{height:'10px'}}></div>
                        }
                        
                    </div> */}
                    <div className={styles.setProfileForm}>
                        <div className='login-title'>
                            <span className='txt-h2 white'>Set up your Profile</span>
                        </div>
                        <div className={styles.avatarSection}>
                            <AvatarUpload onImageSelect={setImageSelect} />
                            <ErrorMsg value={imageError}/>
                        </div>
                        <div className='login-field'>
                            <DefaultInput 
                                placeholder='First name' 
                                value={firstName}
                                onChange={handleFirstNameChange}
                                reset={handleResetFirstName}
                                error={firstnameError}
                                showError={false}
                                onKeyDown={handleKeyDown}
                                limit={64}
                            />
                            <DefaultInput 
                                placeholder='Last name' 
                                value={lastName}
                                onChange={handleLastNameChange}
                                reset={handleResetLastName}
                                error={lastnameError}
                                showError={false}
                                onKeyDown={handleKeyDown}
                                limit={64}
                            />
                            <div style={{width:'100%', display:'flex', flexDirection:'column', gap:'10px'}}>
                                <DefaultInput 
                                    placeholder='Username' 
                                    value={username}
                                    onChange={handleUsernameChange}
                                    reset={handleResetUsername}
                                    error={usernameError}
                                    success={validUsername}
                                    showError={false}
                                    onKeyDown={handleKeyDown}
                                    limit={64}
                                />
                                <ErrorMsg value={emptyError} />
                            </div>
                            <NormalPrimaryButton text="Ready to explore" onClick={setProfileRequest} isLoading={updateProfileLoading} />
                        </div>
                    </div>
                </div>
                <div className='image'>
                    <img src={image1} alt="signin logo"/>
                </div>
            </div>
        </>
    )
}

export default Setup