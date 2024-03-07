import { useMutation } from 'react-query';

import { resetPasswordOTP } from 'shared/api/auth';

const useResetPassOTP = ({...props}) => {
    const { mutate: resetPassOTPRequest, isLoading: resetPassOTPLoading, error: resetPassOTPError } = useMutation(resetPasswordOTP, {
        onSuccess: (data) => {
            props.onSuccess(data);
        },
        onError: (error) => {
            props.onError(error.data.msg);
        }
    });
    
    return { resetPassOTPRequest, resetPassOTPLoading, resetPassOTPError };
}
export default useResetPassOTP;