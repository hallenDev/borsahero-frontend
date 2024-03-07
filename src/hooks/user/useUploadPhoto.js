import { useMutation } from 'react-query';

import { uploadPhoto } from 'shared/api/user';

const useUploadPhoto = (props) => {
    const { mutate: uploadPhotoRequest } = useMutation(uploadPhoto, {
        onSuccess: (data) => {
            props.onSuccess(data);
        }, 
        onError: (error) => {
            props.onError(error.response.data.msg);
        }
    })

    return { uploadPhotoRequest }
}

export default useUploadPhoto;