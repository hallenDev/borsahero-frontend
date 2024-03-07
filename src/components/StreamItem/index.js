import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import AvatarViewNum from 'components/AvatarViewNum';
import { SmallPrimaryButton } from 'ui/buttons';
import { Live, ViewNum, Options, Free, Paid } from 'ui/tags';

const StreamItem = ({data, type="video", ...props}) => {

    const navigate = useNavigate();

    const handleClickAction = () => {
        if(type == 'video') navigate(`/video/${data?.id}`, {state: {content: data}});
    }

    return (
        <div className={styles.itemWrapper} onClick={handleClickAction} style={{backgroundImage:data? `url(${data?.files[0].poster_url})`:''}}>
            <div className={styles.topSection}>
                <div className={styles.left}>
                    {
                        type != 'video' ? 
                        <Live /> : <></>
                    }
                    <ViewNum count={data?.view_count ?? 0} />
                </div>
                <div className={styles.right}>
                    <Options value={data?.market}/>
                    {/* <Free /> */}
                    {
                        data?.content_type == 'free' ? <Free /> : <Paid />
                    }
                </div>
            </div>
            <div className={styles.bottomSection}>
                <AvatarViewNum user={data?.user} />
                <div style={{width: '82px'}}>
                    <SmallPrimaryButton text="subscribe" />
                </div>
            </div>
        </div>
    )
}

export default StreamItem;