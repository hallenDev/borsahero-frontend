import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import styles from './index.module.scss';
import NavBar from 'components/NavBar';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';

import Title from './components/Title';
import StreamContent from './components/StreamContent';
import { getStream } from 'shared/api/member';

const Stream = () => {

    let { id } = useParams();
    const { state } = useLocation();

    const {data: streamData = state?.data ?? {}} = useQuery(['streamData', id], () => getStream(id));

    return (
        <>
            <NavBar tab="income"/>
            <div className="pageContainer">
                <div className={styles.header}>
                    <div></div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div style={{padding:'0 24px 24px 24px', width: 'calc(100% - 48px)'}}>
                    <div className={styles.form}>
                        <Title data={streamData}/>
                        <StreamContent data={streamData} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Stream;