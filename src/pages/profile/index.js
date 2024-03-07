import { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

const Profile = ({...props}) => {

    const navigate = useNavigate();

    const { userId } = useParams();

    const { userData, isSignedIn } = useContext(AuthContext);

    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if(!isSignedIn) {
            navigate("/");
        }
    }, [isSignedIn])

    const { data: videos = [] } = useQuery(['videos', userData?.id], () => getVideos(userData?.id));
    const { data: playlists = [] } = useQuery(['playlists', userData?.id], () => getPlaylists(userData?.id));
    const {data: myProfile = {}} = useQuery('myProfile', () => getProfile({id:userData?.id}));

    const handleEditProfile =() => {
        // navigate("/setting");
        setEdit(true);
    }

    return (
        <>
            <NavBar tab='' />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.deskTitle}>
                        <H2 value="My Profile" />
                    </div>
                    <div className={styles.mobTitle}>
                        <H3 value="My Profile" />
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
                            <div className={styles.editBtn} onClick={handleEditProfile}>
                                <Edit width={24} height={24} />
                            </div>
                            <div className={styles.avatarSection}>
                                <img src={userData?.avatar ?? avatar1} className={styles.profileAvatar} />
                                <div className={styles.profileInfo}>
                                    <H3 value={`${userData?.first_name ?? ""} ${userData?.last_name ?? ""}`} />
                                    <PrimaryText value={`@${userData?.username ?? ""}`} />
                                    <div className={styles.detailSection}>
                                        <div className={styles.subscribers}>
                                            <User width={24} height={24} color={'#FFFFFF66'} />
                                            <SecondaryGreyText value="104k subscribers" />
                                        </div>
                                        <div className={styles.videos}>
                                            <Media width={24} height={24} color={'#FFFFFF66'} />
                                            <SecondaryGreyText value={`${myProfile?.total_videos ?? 0} videos`} />
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
                                    userData?.bio ?
                                    <PrimaryText 
                                        value={userData.bio}
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
            {
                edit && 
                <EditModal 
                    onClose={() => setEdit(false)}
                    userData={userData}
                />
            }
        </>
    )
}

export default Profile;