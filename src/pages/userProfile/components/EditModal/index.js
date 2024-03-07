import { useState, useEffect, useRef, useContext } from 'react';
import { useMutation } from 'react-query'

import styles from './index.module.scss';
import { PrimaryText } from 'ui/text';
import { DefaultInput, BigField } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import { Close } from 'ui/svg/icon';
import noop from 'utils/noop';
import { debounce } from "lodash";
import useValidateUsername from 'hooks/user/useValidateUsername';
import { updateProfile } from 'shared/api/member';
import { AuthContext } from 'context/AuthProvider';
import { useToast } from 'components/Toast';

const EditModal = ({userData, onClose=noop, ...props}) => {

    const toast = useToast();

    const { updateUserData } = useContext(AuthContext);

    const [data, setData] = useState({
                                first_name: userData?.first_name ?? "", 
                                last_name: userData?.last_name ?? "", 
                                username: userData?.username ?? "" , 
                                bio: userData?.bio ?? ""});

    const [error, setError] = useState({
        first_name: "",
        last_name: "",
        username: "",
        bio: ""
    })

    const [validUsername, setValidUsername] = useState(true);
    const [loading, setLoading] = useState(false);

    const { mutate } = useMutation(updateProfile, {
        onSuccess: data => {
            updateUserData(data?.user)

            toast.open({
                type: "success",
                message: "Your profile information was updated successfully."
            });
            onClose();
        },
        onError: ({ data }) => {
            console.log("error while updating profile: ", data?.msg);
        },
        onSettled: _ => {
            setLoading(false)
        },
    })

    const NoError = () => {
        return error.first_name == "" && error.last_name == "" && error.username == "";
    }

    useEffect(() => {
        setError({
            first_name: data.first_name == "" ? "Required field" : "",
            last_name: data.last_name == "" ? "Required field" : "",
            username: data.username == "" ? "Required field" : "",
            // bio: data.bio == "" ? "Required field" : "",
        })

    }, [data])

    const { validateUsernameRequest } = useValidateUsername({
        onSuccess: (_data) => {
            setValidUsername(_data.status);
            if(_data.status == false) {
                setError({
                    ...error,
                    username: "It seems someone beat you to that nickname"
                })
            }
        },
        onError: (error) => {
            setValidUsername(false);
            setUnError("Error while validating username");
        }
    })

    const validateUsername = async (_username, _userData) => {
        // if(_username == "") return;
        validateUsernameRequest({userData: _userData, username: _username});
    }

    const debouncedValidateUsername = useRef(
        debounce(async (value, _userData) => {
          await validateUsername(value, _userData);
        }, 500)
      ).current;

    const handleInputChange= (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })

        if(e.target.name == 'username') {
            debouncedValidateUsername(e.target.value, userData);
            setValidUsername(false);
        }
    }

    const handleSave = () => {
        // to do save action

        if(!NoError()) {
            return;
        }

        setLoading(true);

        mutate(data);

        // onClose();
    }

    const handleReset = (e) => {
        setData({
            ...data,
            [e.currentTarget.name]: "",
        })

        if(e.currentTarget.name == "username") {
            // setError({
            //     ...error,
            //     username: "Required field"
            // })
            setValidUsername(false);
            debouncedValidateUsername("", userData);
        }
    }

    return (
        <div className="modal">
            <div className={styles.form}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.title}>
                    <PrimaryText value="Edit profile" />
                </div>
                <div className={styles.content}>
                    <DefaultInput 
                        label="First name" 
                        placeholder="First name" 
                        name="first_name" 
                        value={data.first_name} 
                        onChange={handleInputChange}
                        reset={handleReset}
                        error={error.first_name}
                        limit={64}
                    />
                    <DefaultInput 
                        label="Last name" 
                        placeholder="Last name" 
                        name="last_name" 
                        value={data.last_name}
                        onChange={handleInputChange}
                        reset={handleReset}
                        error={error.last_name}
                        limit={64}
                    />
                    <DefaultInput 
                        label="Username" 
                        placeholder="Username" 
                        name="username" 
                        value={data.username}
                        onChange={handleInputChange}
                        reset={handleReset}
                        error={error.username}
                        success={validUsername}
                        limit={64}
                    />
                    <BigField 
                        placeholder="Bio" 
                        label="Bio" 
                        name="bio" 
                        value={data.bio}
                        onChange={handleInputChange}
                        // error={error.bio}
                    />
                </div>
                <div className={styles.action}>
                    <div className={styles.item}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.item}>
                        <NormalPrimaryButton text="Save" onClick={handleSave} isLoading={loading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;
