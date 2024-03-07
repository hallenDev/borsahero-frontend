import { useMutation } from 'react-query';

import { resetPassword } from 'shared/api/auth';

const useResetPassword = ({...props}) => {
    const { mutate: resetPasswordRequest, isLoading: resetPasswordLoading, error: resetPasswordError } = useMutation(resetPassword, {
        onSuccess: (data) => {
            props.onSuccess(data);
        },
        onError: (error) => {
            props.onError(error.response.data.msg);
        }
    });
    
    return { resetPasswordRequest, resetPasswordLoading, resetPasswordError };
}
export default useResetPassword;