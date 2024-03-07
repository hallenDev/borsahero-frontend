import { Link, useNavigate } from 'react-router-dom';
import NavBar from 'components/NavBar';
import { useContext, useEffect, useState } from 'react';

import AvatarUpload from 'components/AvatarUpload';
import TopUser from 'pages/home/components/TopUser';
import SearchButton from 'components/search/SearchButton';
import SearchInput from 'components/search/SearchInput';
import Account from 'components/Account';
import LiveButton from 'components/LiveButton';
import TrendingItem from 'components/TrendingItem';
import PopularList from './components/PopularList';
import Streams from './components/Streams';

import styles from 'pages/home/index.module.scss';

import { AuthContext } from 'context/AuthProvider';

import { SmallPrimaryButton } from 'ui/buttons';
import StreamItem from 'components/StreamItem';
import { isCompletedProfile } from 'utils/checkValidation';

const Home = () => {

    const navigate = useNavigate();

    const { isSignedIn, signOut, userData } = useContext(AuthContext);
    const [ isSearch, setIsSearch ] = useState(false);
    const [searchKey, setSearchKey] = useState("");

    useEffect(() => {
        if(!isSignedIn) return;
        if(!isCompletedProfile(userData)) navigate("/set-up");
    }, [])

    const handleSearchActive = () => {
        if(isSearch) {
            setIsSearch(false);
            setSearchKey("");
        }
        else setIsSearch(true);
    }

    const handleSignout = () => {
        signOut();
    }

    const handleSearchKeyChange = (e) => {
        setSearchKey(e.target.value);
    }

    return (
        <>
            <NavBar tab='home' />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.leftHeader}>
                        <TopUser />
                        <div className={styles.line} />
                        {
                            isSearch?
                            <SearchInput onClick={handleSearchActive} onChange={handleSearchKeyChange} />
                            :
                            <SearchButton onClick={handleSearchActive}/>
                        }
                    </div>
                    <div className={isSearch? styles.mobileHeader :styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.responsiveSearch}>
                        {
                            isSearch?
                            <div className={styles.middleSearch}>
                                <SearchInput onClick={handleSearchActive} onChange={handleSearchKeyChange} />
                            </div>
                            :
                            <SearchButton onClick={handleSearchActive}/>
                        }
                        </div>
                        <div className={styles.line} />
                        <Account />
                    </div>
                    {
                        isSearch? 
                        <div className={styles.fullSearch}> 
                            <SearchInput onClick={handleSearchActive} fullWidth={true} onChange={handleSearchKeyChange} />
                        </div>
                        :<></>
                    }
                </div>
                {
                    searchKey == "" ?
                    <>
                        <div className={styles.landingSection}>
                            <div className={styles.leftSection}>
                                <div className={styles.brand}>
                                    <span className={styles.title}>
                                        Trade, earn money, follow popular streamers
                                    </span>
                                    <span className={styles.description}>
                                        Watch trading titans and become one of them
                                    </span>
                                </div>
                                
                                <div className={styles.popularListDesktop}>
                                    <PopularList />
                                </div>
                            </div>
                            <div className={styles.rightSection}>
                                <TrendingItem />
                            </div>
                        </div>
                        <div className={styles.popularListMobile}>
                            <PopularList />
                        </div>
                        <Streams />
                    </>
                    :
                    <>
                        <div className={styles.searchForm}>
                            <StreamItem />
                            <StreamItem />
                            <StreamItem />
                            <StreamItem />
                            <StreamItem />
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Home;