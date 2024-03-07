import { useEffect } from 'react';

import { CircleInput } from 'ui/input';
import useVerificationHook from 'hooks/useVerificationHook';
import { ErrorMsg } from 'ui/text';
import noop from 'utils/noop';

const VerifyCodeInput = ({onChange, error = "", onEnter=noop, ...props}) => {

    const { code, inputStates, inputClass, handleChange, handleKeyDown } = useVerificationHook(6);

    useEffect(() => {
        onChange(code);
    }, [code])

    const handleCustomKeyDown = (e, index) => {
        handleKeyDown(e, index);
        if(e.key === 'Enter') {
            onEnter();
        }
    }

    return (
        <div className="verify-code-wrapper">
            <div className="verify-code-form">
                {
                    inputStates.map((state, index) => {
                        return (
                            <CircleInput index={index} value={state.digit} onChange={handleChange} onKeyDown={(e) => handleCustomKeyDown(e, index)} key={index} error={error} />
                        )
                    })
                }
            </div>
            {
                error != "" ?
                <ErrorMsg value={error} />
                :<></>
            }
        </div>
        
    )
}

export default VerifyCodeInput;