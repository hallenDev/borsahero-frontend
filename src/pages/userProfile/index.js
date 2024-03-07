import { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import NavBar from 'components/NavBar';
import { Rating } from 'react-simple-star-rating';
import { useQuery } from 'react-query';

import styles from './index.module.scss';

import { H2, H3, SecondaryText, PrimaryText, SecondaryGreyText } from 'ui/text';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';
import avatar1 from 'assets/png/avatar1.png';
import Videos from './components/Videos';
import Playlists from './components/Playlists';

import { User, Media, Edit } from 'ui/svg/icon';
import { getPlaylists, getVideos, getProfile } from 'shared/api/member';

import { AuthContext } from 'context/AuthProvider';
import EditModal from './components/EditModal';

const UserProfile = ({...props}) => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const {user: otherUser} = state ?? {user: null}

    const { userData } = useContext(AuthContext);

    const { data: videos = [] } = useQuery(['videos', otherUser?.id], () => getVideos(otherUser?.id));
    const { data: playlists = [] } = useQuery(['playlists', otherUser?.id], () => getPlaylists(otherUser?.id));

    return (
        <>
            <NavBar tab='' />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.deskTitle}>
                        <H2 value="User Profile" />
                    </div>
                    <div className={styles.mobTitle}>
                        <H3 value="User  Profile" />
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className="pageContent">
                    <div className={styles.content}>
                        <div className={styles.profileSection}>
                            <div className={styles.avatarSection}>
                                <img src={otherUser?.avatar ?? avatar1} className={styles.profileAvatar} />
                                <div className={styles.profileInfo}>
                                    <H3 value={`${otherUser?.first_name ?? ""} ${otherUser?.last_name ?? ""}`} />
                                    <PrimaryText value={`@${otherUser?.username ?? ""}`} />
                                    <div className={styles.detailSection}>
                                        <div className={styles.subscribers}>
                                            <User width={24} height={24} color={'#FFFFFF66'} />
                                            <SecondaryGreyText value="104k subscribers" />
                                        </div>
                                        <div className={styles.videos}>
                                            <Media width={24} height={24} color={'#FFFFFF66'} />
                                            <SecondaryGreyText value={`${otherUser?.total_videos ?? 0} videos`} />
                                        </div>
                                    </div>
                                    <div className={styles.reviewSecion}>
                                        <div className={styles.reviewIcon}>
                                            <Rating iconsCount={1} size={19} readonly={true} />
                                            <span className={styles.reviewPoint}>4.3</span>
                                        </div>
                                        <Link to="/reviews/anonymous" className={styles.reviewLink}>70 reviews</Link>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.profileLine}></div>
                            <div className={styles.bioSection}>
                                <H3 value="Bio" />
                                {
                                    otherUser?.bio ?
                                    <PrimaryText 
                                        value={otherUser.bio}
                                    />
                                    :
                                    <div className={styles.emptyBio}>No bio yet</div>
                                }
                            </div>
                        </div>
                        <Videos data={videos} />
                        <Playlists data={playlists} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;