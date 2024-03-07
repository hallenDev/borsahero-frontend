// import UserAvatar from 'components/UserAvatar';
import UserAvatar from 'components/UserAvatar';
import styles from 'pages/home/components/TopUser.module.scss';

import avatar1 from 'assets/png/avatar1.png'
import avatar2 from 'assets/png/avatar2.png'
import avatar3 from 'assets/png/avatar3.png'
import avatar4 from 'assets/png/avatar4.png'
import avatar5 from 'assets/png/avatar5.png'
import avatar6 from 'assets/png/avatar6.png'
import avatar7 from 'assets/png/avatar7.png'

import { Right } from 'ui/svg/icon';

const TopUser = ({...props}) => {
    return (
        <div className={styles.topUserWrapper}>
            <UserAvatar url={avatar1} />
            <UserAvatar url={avatar2} />
            <UserAvatar url={avatar3} />
            <UserAvatar url={avatar4} />
            <UserAvatar url={avatar5} />
            <UserAvatar url={avatar6} />
            <UserAvatar url={avatar7} />
            <div className={styles.RightArrow}>
                <Right width={24} height={24} />
            </div>
        </div>
    )
}
export default TopUser;