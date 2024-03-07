import { useMutation } from 'react-query';

import { updateProfile } from 'shared/api/user';

const useUpdateProfile = (props) => {
    const { mutate: updateProfileRequest, isLoading:updateProfileLoading } = useMutation(updateProfile, {
        onSuccess: (data) => {
            props.onSuccess(data);
        },
        onError: (error) => {
            props.onError(error.data.msg);
        }
    });
    
    return { updateProfileRequest, updateProfileLoading };
}

export default useUpdateProfile;