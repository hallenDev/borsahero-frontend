import { useMutation } from 'react-query';

import { registerOTP } from 'shared/api/auth';

const useRegisterOTP = ({...props}) => {
    const { mutate: registerOTPRequest, isLoading: registerOTPLoading, error: registerOTPError } = useMutation(registerOTP, {
        onSuccess: (data) => {
            props.onSuccess(data);
        },
        onError: (error) => {
            props.onError(error.data.msg);
        }
    });
    
    return { registerOTPRequest, registerOTPLoading, registerOTPError };
}
export default useRegisterOTP;