import { useState, useContext } from 'react';
import { useMutation } from 'react-query'

import styles from './index.module.scss';
import { PrimaryInput, BigField } from 'ui/input';
import { NormalPrimaryButton, NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import { H3, PrimaryText, PrimaryGreyText } from 'ui/text';
import { Verified } from 'ui/tags';

import DeleteAccountModal from '../DeleteAccountModal';
import { AuthContext } from 'context/AuthProvider';
import { updateProfile } from 'shared/api/member';
import { useToast } from 'components/Toast';
import UserInfoEdit from './UserInfoEdit';
import EmailEdit from './EmailEdit';
import PasswordEdit from './PasswordEdit';
import ProfileSubscription from './ProfileSubscription';

const ProfileTab = ({...props}) => {

    const toast = useToast();
    const { userData, updateUserData } = useContext(AuthContext);

    const [firstname, setFirstname] = useState(userData?.first_name ?? "");
    const [lastname, setLastname] = useState(userData?.last_name ?? "");
    const [username, setUsername] = useState(userData?.username ?? "");
    const [bio, setBio] = useState(userData?.bio ?? "");
    const [profileLoading, setProfileLoading] = useState(false);

    const [openDelete, setOpenDelete] = useState(false);
    const [openEmailChange, setOpenEmailChange] = useState(false);
    const [openSubscription, setOpenSubscription] = useState(false);

    const { mutate } = useMutation(updateProfile, {
        onSuccess: data => {
            updateUserData(data?.user)

            toast.open({
                type: "success",
                message: "Your profile information was updated successfully."
            });
        },
        onError: ({ data }) => {
            console.log(data?.msg)
        },
        onSettled: _ => {
            setProfileLoading(false)
        },
    })

    

    const handleProfileSave = () => {
        setProfileLoading(true);

        mutate({first_name:firstname, last_name: lastname, username , bio});
    }
    
    const handleCancelProfile = () => {
        setFirstname(userData?.first_name ?? "");
        setLastname(userData?.last_name ?? "");
        setUsername(userData?.username ?? "");
        setBio(userData?.bio ?? "");
    }

    return (
        <div className={styles.profileWrapper}>
            <UserInfoEdit />
            {/* <div className={styles.profileCard}>
                <div className={styles.avatarWrapper}>
                    <AvatarUpload />
                </div>
                <div className={styles.inputWrapper}>
                    <div className={styles.name}>
                        <div className={styles.firstName}>
                            <PrimaryInput 
                                placeholder="First name"
                                value={firstname}
                                onChange={handleFirstnameChange}
                                reset={handleFirstnameReset}
                            />
                        </div>
                        <div className={styles.lastName}>
                            <PrimaryInput 
                                placeholder="Last name"
                                value={lastname}
                                onChange={handleLastnameChange}
                                reset={handleLastnameReset}
                            />
                        </div>
                    </div>
                    <div className={styles.username}>
                        <PrimaryInput 
                            placeholder="Username"
                            value={username}
                            onChange={handleUsernameChange}
                            reset={handleUsernameReset}
                        />
                    </div>
                    <div className={styles.bio}>
                        <BigField placeholder="Bio" value={bio} onChange={handleBioChange} />
                    </div>
                </div>
                <div className={styles.actionWrapper}>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Save" onClick={handleProfileSave} isLoading={profileLoading} />
                    </div>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={handleCancelProfile} />
                    </div>
                </div>
            </div> */}
            <div className={styles.setting}>
                <EmailEdit userData={userData} />
                <PasswordEdit />
                <div className={styles.settingCard}>
                    <H3 value="Account" />
                    <NormalDestructiveBtn text="Delete account" onClick={() => setOpenDelete(true)} />
                </div>
            </div>
            <ProfileSubscription />
        </div>
    )
}

export default ProfileTab;