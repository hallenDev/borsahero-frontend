import { useState } from 'react';

import styles from './index.module.scss';
import { PrimaryGreyText } from 'ui/text';
import Viewers from './Viewers';
import Profits from './Profits';
import VoiceChat from './VoiceChat';
import Chat from './Chat';

const StreamPanel = ({data, ...props}) => {

    const [tab, setTab] = useState('Chat');

    return (
        <div className={styles.streamPanel}>
            <div className={styles.tabGroup}>
                <div className={tab=='Chat' ? styles.tabSelected:styles.tab} onClick={() => setTab('Chat')}>Chat</div>
                <div className={tab=='Profits' ? styles.tabSelected:styles.tab} onClick={() => setTab('Profits')}>Profits</div>
                <div className={tab=='Voice chat' ? styles.tabSelected:styles.tab} onClick={() => setTab('Voice chat')}>Voice chat</div>
                <div className={tab=='Viewers' ? styles.tabSelected:styles.tab} onClick={() => setTab('Viewers')}>Viewers</div>
            </div>
            {
                tab == 'Viewers' ?
                <Viewers /> :<></>
            }
            {
                tab == 'Profits' ?
                <Profits /> :<></>
            }
            {
                tab == 'Voice chat' ?
                <VoiceChat /> :<></>
            }
            {
                tab == 'Chat' ?
                <Chat data={data} /> :<></>
            }
        </div>
    )
}

export default StreamPanel;