import { useState, useContext, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import { ClipLoader } from 'react-spinners';

import avatarStab from 'assets/png/avatarStab.png';
import { Upload, Close } from 'ui/svg/icon';
import image1 from 'assets/png/Image1.png';
import useUploadPhoto from 'hooks/user/useUploadPhoto';

import { AuthContext } from 'context/AuthProvider';
import { useToast } from 'components/Toast';
import noop from 'utils/noop'

import styles from './AvatarUpload.module.scss';

const MB = 1024 * 1024;

const AvatarUpload = ({onImageSelect=noop, ...props}) => {

    const toast = useToast();
    const { userData, updateUserData } = useContext(AuthContext);
    const [image, setImage] = useState(userData?.avatar ?? null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    useEffect(() => {
        if(userData?.avatar) onImageSelect(true);
        else onImageSelect(false);
    }, [])


    const { uploadPhotoRequest } = useUploadPhoto({
        onSuccess: (data) => {
            updateUserData(data.user);
            onImageSelect(true);
            setLoading(false);
            setError(false);
        },
        onError: (error) => {

        }
    })

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
                    setLoading(true);
                    setImage(URL.createObjectURL(acceptedFiles[0]));
                    if(!userData) {
                        console.log('not logged in');
                        return;
                    }
                    // upload acceptedFiles[0]
                    // console.log(acceptedFiles[0]);
                    uploadPhotoRequest({userData: userData, file: acceptedFiles[0]});
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

        // need to sync with backend
        setImage(null);
        onImageSelect(false);
        if(!userData) {
            console.log("not logged in");
            return;
        }
        let tmp = userData;
        tmp.avatar = null;
        updateUserData(tmp);
        setError(true);
    }

    return (
        <div className={styles.avatarUploadForm}>
            {
                loading &&
                <div style={{position:'absolute', width:'100%', height:'100%',borderRadius:'50%', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#000000BF'}}>
                    <ClipLoader color='white' size={40} />
                </div>
            }
            
            <input {...getInputProps()} />
            <img src={image ? image : (userData?.avatar? userData.avatar: avatarStab)} style={{width: 128, height: 128, cursor: 'pointer', borderRadius:'50%'}}/>
            {
                (!image && !userData?.avatar) ?
                <div {...getRootProps()} style={{zIndex:10, position:'absolute', bottom:'8px', right:'8px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'white'}}>
                    <Upload color="black" width={24} height={24} style={{margin:'4px'}}/>
                </div>
                :
                <div onClick={handleRemoveAvatar} style={{zIndex:10, position:'absolute', bottom:'8px', right:'8px', width:'32px', height:'32px', borderRadius:'50%', backgroundColor:'white'}}>
                    <Close color="black" width={24} height={24} style={{margin:'4px'}}/>
                </div>
            }
        </div>
    )
}

export default AvatarUpload;