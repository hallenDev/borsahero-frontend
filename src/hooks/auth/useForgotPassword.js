import { useMutation } from 'react-query';

import { forgotPassword } from 'shared/api/auth';

const useForgotPassword = (props) => {
    const { mutate: forgotPassRequest, isLoading: forgotPassLoading, error: forgotPassError } = useMutation(forgotPassword, {
        onSuccess: (data) => {
            props.onSuccess();
        },
        onError: (error) => {
            props.onError(error.data.msg);
        }
    });
    
    return { forgotPassRequest, forgotPassLoading, forgotPassError };
}

export default useForgotPassword;