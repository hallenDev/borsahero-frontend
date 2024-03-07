import { useState, useContext, useRef, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query'
import { debounce } from "lodash"
import { useDropzone } from "react-dropzone";
import { ClipLoader } from 'react-spinners';

import styles from './index.module.scss';
import AvatarUpload from 'components/AvatarUpload';
import { PrimaryInput, BigField } from 'ui/input';
import { H3, PrimaryText } from 'ui/text';
import { NormalPrimaryButton, NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import { AuthContext } from 'context/AuthProvider';
import { updateProfile, getProfile } from 'shared/api/member';
import { useToast } from 'components/Toast';
import useValidateUsername from 'hooks/user/useValidateUsername';
import avatarStab from 'assets/png/avatarStab.png';
import { Verified, Upload, Close } from 'ui/svg/icon';
import { ErrorMsg } from 'ui/text';
import useUploadPhoto from 'hooks/user/useUploadPhoto';

const MB = 1024 * 1024;

const UserInfoEdit = () => {

    const toast = useToast();

    const { userData, updateUserData } = useContext(AuthContext);

    const {data: myProfile = {}} = useQuery('myProfile', () => getProfile({id:userData?.id}));

    const [firstname, setFirstname] = useState(userData?.first_name ?? "");
    const [fnError, setFnError] = useState("");
    const [lastname, setLastname] = useState(userData?.last_name ?? "");
    const [lnError, setLnError] = useState("");
    const [username, setUsername] = useState(userData?.username ?? "");
    const [unError, setUnError] = useState("");
    const [bio, setBio] = useState(userData?.bio ?? "");
    const [loading, setLoading] = useState(false);
    const [validUsername, setValidUsername] = useState(true);
    const [edit, setEdit] = useState(false);
    const [cover, setCover] = useState({
        image: userData?.avatar ?? null,
        file: null
    });
    const [coverFile, setCoverFIle] = useState(null);
    const [coverError, setCoverError] = useState("");

    useEffect(() => {
        if(myProfile && username == "") {
            setFirstname(myProfile?.first_name ?? "");
            setLastname(myProfile?.last_name ?? "");
            setUsername(myProfile?.username ?? "");
            setBio(myProfile?.bio ?? "");
            setCover({
                image: myProfile?.avatar,
                file: null
            })
        }
    }, [])
    
    const { uploadPhotoRequest } = useUploadPhoto({
        onSuccess: (data) => {
            toast.open({
                type: "success",
                message: "Your profile information was updated successfully."
            });
            updateUserData(data?.user);
            setEdit(false);
            setLoading(false);
        },
        onError: (error) => {
            setLoading(false);
        }
    })
    const { mutate } = useMutation(updateProfile, {
        onSuccess: data => {
            // updateUserData(data?.user)
            if(cover?.file) uploadPhotoRequest({userData: data?.user, file: cover.file});
            else {
                toast.open({
                    type: "success",
                    message: "Your profile information was updated successfully."
                });
                updateUserData(data?.user);
                setEdit(false);
                setLoading(false);
            }
        },
        onError: ({ data }) => {
            console.log(data?.msg)
        },
        onSettled: _ => {
            // setLoading(false)
        },
    })

    const initError = () => {
        setFnError("");
        setLnError("");
        setUnError("");
    }

    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
        if(e.target.value == "") setFnError("error");
        else setFnError("");
    }

    const handleFirstnameReset = (e) => {
        setFirstname("");
        setFnError("error");
    }

    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
        if(e.target.value == "") setLnError("error");
        else setLnError("");
    }
    
    const handleLastnameReset = (e) => {
        setLastname("");
        setLnError("error");
    }

    const { validateUsernameRequest } = useValidateUsername({
        onSuccess: (data) => {
            setValidUsername(data.status);
            if(data.status == false) {
                setUnError("It seems someone beat you to that nickname");    
            }
        },
        onError: (error) => {
            setValidUsername(false);
            setUnError("Error while validating username");
        }
    })

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
        setUsername(e.target.value);
        debouncedValidateUsername(e.target.value, userData);
        if(e.target.value == "") {
            setUnError("Please fill required field");
            setValidUsername(false);
        }
        else {
            setUnError("");
            setValidUsername(false);
        }
    }

    const handleUsernameReset = (e) => {
        setUsername("");
        setValidUsername(false);
        setUnError("Please fill required field");
    }
    
    const handleBioChange = (e) => {
        setBio(e.target.value);
    }

    const handleProfileSave = () => {

        if(firstname == "" || lastname == "" || username == "" || !cover) {
            if(!cover) setCoverError("Please upload avatar.");
            return;
        }
        setLoading(true);

        mutate({first_name:firstname, last_name: lastname, username , bio});
    }

    const handleCancelProfile = () => {
        setEdit(false);
        setFirstname(userData?.first_name ?? "");
        setLastname(userData?.last_name ?? "");
        setUsername(userData?.username ?? "");
        setBio(userData?.bio ?? "");
        setCover({
            image: userData?.avatar ?? null,
            file: null
        });
        setCoverError("");
        initError();
        
    }

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/heic": [".heic"]
        },
        onDrop: async acceptedFiles => {
            if (acceptedFiles.length > 0) {
                try {
                    if(acceptedFiles[0].size > 5 * MB) {
                        toast.open({
                            type: "error",
                            message: "Only .jpeg, .png, .heic, max 5MB"
                        });
                        return;
                    }
                    // setLoading(true);
                    // setImage(URL.createObjectURL(acceptedFiles[0]));
                    // if(!userData) {
                    //     console.log('not logged in');
                    //     return;
                    // }
                    // // upload acceptedFiles[0]
                    // // console.log(acceptedFiles[0]);
                    // uploadPhotoRequest({userData: userData, file: acceptedFiles[0]});
                    setCoverError("");
                    setCover({
                        image: URL.createObjectURL(acceptedFiles[0]),
                        file: acceptedFiles[0]
                    })
                } catch (error) { }
            } else {
                toast.open({
                    type: "error",
                    message: "Only .jpeg, .png, .heic, max 5MB"
                });
            }
        }
    })

    const handleRemoveAvatar = () => {
        setCover(null);
    }

    return (
        <>
        {
            edit ? 
            <div className={styles.profileCard}>
                <div className={styles.avatarWrapper}>
                    {/* <AvatarUpload onImageSelect={setCover}/> */}
                    <div className={styles.avatar}>
                        <img src={cover?.image ? cover?.image : avatarStab} />
                        {
                            cover?.image ?
                            <div className={styles.upload} onClick={handleRemoveAvatar}>
                                <Close color="black" width={24} height={24} style={{margin:'4px'}} />
                            </div>
                            :
                            <div className={styles.upload} {...getRootProps()}>
                                <Upload color="black" width={24} height={24} style={{margin:'4px'}} />
                            </div>
                        }
                    </div>
                    <ErrorMsg value={coverError}/>
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.name}>
                        <div className={styles.firstName}>
                            <PrimaryInput 
                                placeholder="First name"
                                value={firstname}
                                onChange={handleFirstnameChange}
                                reset={handleFirstnameReset}
                                error={fnError}
                                showError={false}
                                limit={64}
                            />
                        </div>
                        <div className={styles.lastName}>
                            <PrimaryInput 
                                placeholder="Last name"
                                value={lastname}
                                onChange={handleLastnameChange}
                                reset={handleLastnameReset}
                                error={lnError}
                                showError={false}
                                limit={64}
                            />
                        </div>
                    </div>
                    <div className={styles.username}>
                        <PrimaryInput 
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            reset={handleUsernameReset}
                            error={unError}
                            success={validUsername}
                            limit={64}
                        />
                    </div>
                    <div className={styles.bio}>
                        <BigField value={bio} onChange={handleBioChange} />
                    </div>
                </div>
                <div className={styles.actionWrapper}>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Save" onClick={handleProfileSave} isLoading={loading} />
                    </div>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={handleCancelProfile} />
                    </div>
                </div>
            </div>
            :
            <div className={styles.profileInfoCard} >
                <div className={styles.avatarSection}>
                    <img src={userData?.avatar ?? avatarStab} />
                    <div className={styles.infoSection}>
                        <div className={styles.name}>
                            <H3 value={`${userData?.first_name} ${userData?.last_name}`} />
                            <div>
                                <Verified width={24} height={24} />
                            </div>
                        </div>
                        
                        <PrimaryText value={`@${userData?.username}`} />
                    </div>
                </div>
                <div className={styles.horizentalLine}></div>
                <div className={styles.bioSection}>
                    <H3 value="Bio" />
                    {
                        userData?.bio ?
                        <PrimaryText value={`${userData?.bio ?? ""}`} />
                        :
                        <div className={styles.emptyBio}>No bio yet</div>
                    }
                    
                </div>
                <NormalPrimaryButton text="Edit" onClick={() => setEdit(true)} />
            </div>
        }
        </>
    )
}

export default UserInfoEdit;