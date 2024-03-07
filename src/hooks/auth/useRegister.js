import { useMutation } from 'react-query';

import { register } from 'shared/api/auth';

const useRegister = (props) => {
    const { mutate: registerRequest, isLoading: registerLoading, error: registerError } = useMutation(register, {
        onSuccess: (data) => {
            props.onSuccess();
        },
        onError: (error) => {
            props.onError(error.data.msg);
        }
    });
    
    return { registerRequest, registerLoading, registerError };
}

export default useRegister;