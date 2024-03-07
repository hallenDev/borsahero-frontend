import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery } from 'react-query';
import { SmallPrimaryButton, GoLiveButton } from 'ui/buttons';
import { Live } from 'ui/svg/icon';
import { AuthContext } from 'context/AuthProvider';
import { getSubscription } from 'shared/api/member';
import RequestSubscribeModal from 'components/RequestSubscribeModal';

const LiveButton = ({...props}) => {

    const { isSignedIn } = useContext(AuthContext);

    const [ requestSuscribe, setRequestSubscribe ] = useState(false);

    const navigate = useNavigate();

    // const { data } = useQuery('subscription', getSubscription, {
    //     onError: error => {
    //         console.log(error)
    //     },
    // });

    const handleGoLive = () => {
        navigate('/new-stream');
        // if(data.subscription == null || data.subscription.is_cancelled) {
        //     setRequestSubscribe(true);
        // } else {
        // }
    }

    return (
        <>
            <div style={{width:'117px'}}>
                {
                    isSignedIn && <GoLiveButton text=" Go Live" icon={<Live width={20} height={20} />} onClick={handleGoLive} />
                }
            </div>
            {
                requestSuscribe && <RequestSubscribeModal onClose={() => setRequestSubscribe(false)}/>
            }
        </>
    )
}

export default LiveButton;