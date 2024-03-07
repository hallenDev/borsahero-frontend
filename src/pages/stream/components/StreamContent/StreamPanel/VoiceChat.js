import { useState } from 'react';
import styles from './index.module.scss';
import { NormalDestructiveBtn, SmallPrimaryButton, NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import avatar3 from 'assets/png/avatar3.png';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { Live, Variant47, Close } from 'ui/svg/icon';

const InterruptModal = ({onClose, ...props}) => {

    const interruptAction = () => {
        onClose();
    }

    return (
        <div className="modal">
            <div className={styles.modalForm}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.content}>
                    <PrimaryText value="Interrupt Carla Dias?" />
                    <PrimaryGreyText value='Next user in the queue will start speaking.' />
                </div>
                <div className={styles.actionGroup}>
                    <div className={styles.action}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                    <div className={styles.action}>
                        <NormalPrimaryButton text="Interrupt" onClick={interruptAction} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const AllowModal = ({onClose, ...props}) => {

    const allowAction = () => {
        onClose();
    }

    return (
        <div className="modal">
            <div className={styles.modalForm}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.content}>
                    <PrimaryText value="Allow Carla Dias to speak?" />
                    <PrimaryGreyText value='Text?' />
                </div>
                <div className={styles.actionGroup}>
                    <div className={styles.action}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                    <div className={styles.action}>
                        <NormalPrimaryButton text="Allow" onClick={allowAction} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const FinishModal = ({onClose, ...props}) => {

    const finishAction = () => {
        onClose();
    }

    return (
        <div className="modal">
            <div className={styles.modalForm}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.content}>
                    <PrimaryText value="Finish voice chat?" />
                    <PrimaryGreyText value='Users aren’t able to communicate in a voice chat until you turn on it again.' />
                </div>
                <div className={styles.actionGroup}>
                    <div className={styles.action}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                    <div className={styles.action}>
                        <NormalDestructiveBtn text="Finish" onClick={finishAction} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Item = ({isOn=true, ...props}) => {
    
    const [openInterrupt, setOpenInterrupt] = useState(false);
    const [openAllow, setOpenAllow] = useState(false);

    return (
        <>
        <div className={styles.voiceChatItemForm}>
            <div className={styles.user}>
                <img src={avatar3} />
                <PrimaryText value="Carla Dias" />
            </div>
            <div className={styles.state}>
                {
                    isOn?
                    <div className={styles.interrupt}>
                        <SmallPrimaryButton text="Interrupt" onClick={()=> setOpenInterrupt(true)} />
                    </div>
                    :
                    <div className={styles.allow}>
                        <SmallPrimaryButton text="Allow to speak" onClick={() => setOpenAllow(true)} />
                    </div>
                }
                {
                    isOn?
                    <div className={styles.onState}>
                        <Live color={"#141414"} width={25} height={25} />
                    </div>
                    :
                    <div className={styles.offState}>
                        <Variant47 width={25} height={25} />
                    </div>
                }
            </div>
        </div>
        {
            openInterrupt?
            <InterruptModal onClose={() => setOpenInterrupt(false)}/>
            :<></>
        }
        {
            openAllow?
            <AllowModal onClose={() => setOpenAllow(false)} />
            :<></>
        }
        </>
    )
}

const VoiceChat = () => {

    const [openFinish, setOpenFinish] = useState(false);

    return (
        <>
        <div className={styles.voiceChatForm}>
            <div className={styles.list}>
                <Item isOn={true} />
                <Item isOn={false} />
                <Item isOn={false} />
                <Item isOn={true} />
                <Item isOn={false} />
                <Item isOn={true} />
                <Item isOn={false} />
                <Item isOn={true} />
                <Item isOn={false} />
                <Item isOn={true} />
                {/* <Item isOn={false} />
                <Item isOn={true} />
                <Item isOn={false} /> */}
            </div>
            <div className={styles.finishBtn}>
                <NormalDestructiveBtn text="Finish voice chat" onClick={() => setOpenFinish(true)} />
            </div>
        </div>
        {
            openFinish ?
            <FinishModal onClose={() => setOpenFinish(false)} />
            :<></>
        }
        </>
    )
}

export default VoiceChat;