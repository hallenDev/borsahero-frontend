import { Link, useNavigate } from 'react-router-dom';
import NavBar from 'components/NavBar';
import { useContext, useState, useEffect } from 'react';

import styles from './index.module.scss';
import { H2, H3 } from 'ui/text';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';
import SearchInput from 'components/search/SearchInput';
import Earnings from './components/Earnings';
import Donations from './components/Donations';

import { AuthContext } from 'context/AuthProvider';
import { isCompletedProfile } from 'utils/checkValidation';

const Income = () => {

    const navigate = useNavigate();

    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if(!isCompletedProfile(userData)) navigate("/set-up");
    }, [])

    const [tab, setTab] = useState('Earnings');

    return (
        <>
            <NavBar tab='income' />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.desTitle}>
                        <H2 value="My income" />
                    </div>
                    <div className={styles.mobTitle}>
                        <H3 value="My income" />
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className={styles.tabForm}>
                    <div className={styles.tabButtonForm}> 
                        <button className={(tab != "Earnings")? styles.tabButton: styles.tabButtonActive} onClick={() => setTab('Earnings')}>Earnings</button>
                        <button className={(tab == "Earnings")? styles.tabButton: styles.tabButtonActive} onClick={() => setTab("Donations")}>Donations</button>
                    </div>
                    <div className={styles.tabContent}>
                        {
                            (tab != "Earnings") ?
                            <Donations /> :<Earnings />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Income;