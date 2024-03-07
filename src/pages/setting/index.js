import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from 'components/NavBar';

import { AuthContext } from 'context/AuthProvider';
import styles from './index.module.scss';
import { H2, H3 } from 'ui/text';
import { useState } from 'react';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';

import ProfileTab from './components/ProfileTab';
import SubscriptionsTab from './components/SubscriptionsTab';
import PaymentsTab from './components/PaymentsTab';

import { isCompletedProfile } from 'utils/checkValidation';

const Setting = () => {

    let { id } = useParams();

    const navigate = useNavigate();

    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if(!isCompletedProfile(userData)) navigate("/set-up");
    }, [])
    const [tab, setTab] = useState(id ? id : "profile");

    const goTab = (id) => {
        setTab(id);
        navigate(`/setting/${id}`);
    }

    return (
        <div>
            <NavBar tab='settings' />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.deskTitle}>
                        <H2 value="Settings" />
                    </div>
                    <div className={styles.mobTitle}>
                        <H3 value="Settings" />
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className="pageContent">
                    <div className={styles.tabWrapper}>
                        <div className={tab == "profile" ?styles.tabItemActive : styles.tabItem} onClick={() => goTab("profile")}>Profile</div>
                        <div className={tab == "subscriptions" ?styles.tabItemActive : styles.tabItem} onClick={() => goTab("subscriptions")}>Subscriptions</div>
                        <div className={tab == "payment" ?styles.tabItemActive : styles.tabItem} onClick={() => goTab("payment")}>Payments</div>
                    </div>
                    <div className={styles.tabContent}>
                        {
                            tab == 'profile' ?
                            <ProfileTab /> :<></>
                        }
                        {
                            tab == 'subscriptions' ?
                            <SubscriptionsTab /> :<></>
                        }
                        {
                            tab == 'payment' ?
                            <PaymentsTab /> :<></>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting;