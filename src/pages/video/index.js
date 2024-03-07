import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Media, Video as VideoPlayer} from '@vidstack/player-react';

import styles from './index.module.scss';

import NavBar from 'components/NavBar';

import LiveButton from 'components/LiveButton';
import Account from 'components/Account';
import { BackBtn, ViewAllBtn, SmallTetriaryBtn, SmallDestructiveBtn } from 'ui/buttons';
import { H2, H3, SecondaryText, PrimaryText, PrimaryBold, PrimaryGreyText } from 'ui/text';
import { Views } from 'ui/tags';
import Image from 'assets/png/image6.png';
import { Play } from 'ui/svg/icon';

import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';

import useDateTime from 'utils/useDateTime'
import useViewContent from 'hooks/useViewContent'

import { AuthContext } from 'context/AuthProvider';

const Video = ({...props}) => {

    const navigate = useNavigate();

    const { userData } = useContext(AuthContext);

    const onViewContent = useViewContent();

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    
    const { state } = useLocation();
    const { getPublishDate } = useDateTime()
    const [content, setContent] = useState(state?.content);

    useEffect(() => {
        if(state?.content) onViewContent(state.content);
    }, [state])
    
    const handleEditClick = () => {
        setOpenEdit(true);
    }

    const handleDeleteClick = () => {
        setOpenDelete(true);
    }

    const handleEditClose = () => {
        setOpenEdit(false);
    }

    const handleDeleteClose = () => {
        setOpenDelete(false);
    }

    return (
        <div style={{position:'relative'}}>
            <NavBar />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.deskTitle}>
                        <BackBtn />
                        <H2 value="Video details" />
                    </div>
                    <div className={styles.mobTitle}>
                        <BackBtn />
                        <H3 value="Video details" />
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className="pageContent">
                    <div className={styles.playlistTitle}>
                        <PrimaryBold value="Playlists" />
                        <ViewAllBtn />
                    </div>
                    <div className={styles.detailWrapper}>
                        <div className={styles.videoContent}>
                            {/* <img src={content?.files?.[0].poster_url ?? Image} className={styles.videoCard}/>
                            <div className={styles.playButton}>
                                <Play width={50} height={50} />
                            </div> */}
                            <Media style={{width:'100%', borderRadius:'20px', aspectRatio:'3/2'}}>
                                <VideoPlayer style={{width:'100%', borderRadius:'20px', aspectRatio:'3/2'}} loading="visible" poster={content?.files?.[0].poster_url} controls preload="true">
                                    <video 
                                        loading="visible" 
                                        poster={content?.files?.[0].poster_url} 
                                        src={content?.files?.[0].video_url} 
                                        preload="none" 
                                        data-video="0" 
                                        controls 
                                        style={{borderRadius:'20px', aspectRatio:'3/2'}}
                                        controlsList={"nodownload"}
                                    />
                                </VideoPlayer>
                            </Media>
                        </div>
                        <div className={styles.infoContent}>
                            <div className={styles.title}>
                                <H3 value={content?.title || content?.files?.[0]?.name || "Ultimate streaming course"} />
                                <Views count={content?.view_count} />
                            </div>
                            <PrimaryText
                                value={content?.description || content?.files?.[0]?.description}
                            />
                            <PrimaryGreyText value={`Published ${getPublishDate(content?.created_at)}`} />
                            {
                                content?.user?.username == userData.username ?
                                <div className={styles.actionWrapper}>
                                    <div className={styles.edit}>
                                        <SmallTetriaryBtn text="Edit" onClick={handleEditClick} />
                                    </div>
                                    <div className={styles.delete}>
                                        <SmallDestructiveBtn text="Delete" onClick={handleDeleteClick} />
                                    </div>
                                </div>
                                :<></>
                            }
                            
                        </div>
                    </div>
                    {/* <Views /> */}
                </div>
            </div>
            {
                openEdit ?
                <EditModal 
                    onClose={handleEditClose} 
                    content={content} 
                    onUpdated={setContent} 
                /> : <></>
            }
            {
                openDelete ?
                <DeleteModal 
                    onClose={handleDeleteClose} 
                    content={content} 
                    onDeleted={() => navigate(-1)}
                /> : <></>
            }
        </div>
    )
}

export default Video;