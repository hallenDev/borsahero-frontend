import { useMutation } from 'react-query';

import { validateUsername } from 'shared/api/user';

const useValidateUsername = (props) => {
    const { mutate: validateUsernameRequest, isLoading: validateUsernameLoading, error: validateUsernameError } = useMutation(validateUsername, {
        onSuccess: (data) => {
            props.onSuccess(data);
        },
        onError: (error) => {
            props.onError(error.data.msg);
        }
    });
    
    return { validateUsernameRequest, validateUsernameLoading, validateUsernameError };
}

export default useValidateUsername;