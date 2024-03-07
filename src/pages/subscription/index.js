import { Link, useNavigate } from 'react-router-dom';
import NavBar from 'components/NavBar';
import { useContext, useState, useEffect } from 'react';

import styles from './index.module.scss';
import { H2, H3 } from 'ui/text';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';
import SearchInput from 'components/search/SearchInput';
import SubscriptionList from './components/SubscriptionList';

import { AuthContext } from 'context/AuthProvider';
import { isCompletedProfile } from 'utils/checkValidation';

const Subscription = () => {

    const navigate = useNavigate();

    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if(!isCompletedProfile(userData)) navigate("/set-up");
    }, [])

    const [tab, setTab] = useState('Paid');

    return (
        <>
            <NavBar tab='subscription' />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.desTitle}>
                        <H2 value="My subscriptions" />
                    </div>
                    <div className={styles.mobTitle}>
                        <H3 value="My subscriptions" />
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className={styles.searchForm}>
                    <SearchInput /> 
                </div>
                <div className={styles.tabForm}>
                    <div className={styles.tabButtonForm}> 
                        <button className={(tab != "Paid")? styles.tabButton: styles.tabButtonActive} onClick={() => setTab('Paid')}>Paid</button>
                        <button className={(tab == "Paid")? styles.tabButton: styles.tabButtonActive} onClick={() => setTab("Free")}>Free</button>
                    </div>
                    <div className={styles.tabContent}>
                        <SubscriptionList type={tab} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subscription;