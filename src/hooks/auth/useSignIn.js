import { useMutation } from 'react-query';

import { signIn } from 'shared/api/auth';

const useSignIn = ({...props}) => {
    const { mutate: signInRequest, isLoading: signInLoading, error: signInError } = useMutation(signIn, {
        onSuccess: (data) => {
            // console.log(data);
            props.onSuccess(data);
        },
        onError: (error) => {
            // console.log(error);
            props.onError(error);
        }
    });
    
    return { signInRequest, signInLoading, signInError };
}

export default useSignIn;