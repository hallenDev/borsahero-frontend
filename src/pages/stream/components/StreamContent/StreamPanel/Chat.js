import { useState, useEffect, useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from 'react-query';
import EmojiPicker from 'emoji-picker-react';

import styles from './index.module.scss';
import SearchInput from 'components/search/SearchInput';
import { Money, Smile, Attach, Send, Close } from 'ui/svg/icon';
import avatar4 from 'assets/png/avatar4.png';
import { TetriaryGreyText, SecondaryLabel, H3, SecondaryText, PrimaryText, PrimaryGreyText } from 'ui/text';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import { DefaultInput, BigField } from 'ui/input';
import { AuthContext } from 'context/AuthProvider';
import { getChatToken } from 'shared/api/member';

import {
    ChatRoom,
    // DeleteMessageRequest,
    // DisconnectUserRequest,
    SendMessageRequest,
} from 'amazon-ivs-chat-messaging';

const ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]', // U+1F680 to U+1F6FF
    ' ', // Also allow spaces
  ].join('|');

const ChatItem = ({data, ...props}) => {
    const self = data.user == 'ME' ? true: false;
    const donation = data.donation;

    return (
        <div className={self ? styles.chatItemSelf : styles.chatItem}>
            <img src={data.avatar} />
            <div className={styles.msgContent}>
                <div className={self? styles.timeSelf: styles.time}>
                    <TetriaryGreyText value={`@${data.username}`} />
                    <TetriaryGreyText value="•" />
                    <TetriaryGreyText value={data.time} />
                </div>
                {
                    donation? 
                    <div className={self? styles.donationSelf: styles.donation}>
                        <H3 value="$12" color={'#141414'} />
                        <SecondaryText color={'#141414'} value="Engaging and informative trader" />
                    </div>
                    :
                    <div className={data.onlyEmoji ? (self? styles.messageEmojiSelf : styles.messageEmoji) : (self? styles.messageSelf: styles.message) }>
                        {
                            data.onlyEmoji ? 
                            <div style={{fontSize:'50px'}}>{data.message}</div>
                            :
                            <SecondaryLabel value={data.message} />
                        }
                    </div>
                }
            </div>
        </div>
    )
}

const MessageInput = ({onSend, onChange, value, inputRef, ...props}) => {
    const handleSend = () => {
        onSend();
        onChange("");
    }

    const handleMessageChange = (e) => {
        onChange(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            onSend();
            onChange("");
        }
    }

    return (
        <div className={styles.messageInputForm}>
            <button onClick={handleSend}>
                <Send width={25} height={25} />
            </button>
            <input 
                placeholder="Enter your message" 
                value={value} 
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
        </div>
    )
}

const DonationModal = ({onClose, ...props}) => {

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
                    <PrimaryText value="Donate Wilson Vaccaro" />
                    <PrimaryGreyText value='Your message will be highlighted and visible to any viewer in the chat.' />
                </div>
                <DefaultInput placeholder="Donation $" />
                <BigField limit={100} placeholder="message" />
                <div className={styles.actionGroup}>
                    <div className={styles.action}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                    <div className={styles.action}>
                        <NormalPrimaryButton text="Donate" onClick={interruptAction} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const Chat = ({data, ...props}) => {

    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const { userData, isSignedIn } = useContext(AuthContext);

    const [openDonation, setOpenDonation] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatToken, setChatToken] = useState(null);
    const [chatRoom, setChatRoom] = useState([]);
    const [emotOpen, setEmotOpen] = useState(false);
    const [message, setMessage] = useState("");
    const CHAT_REGION = "us-east-1";

    useEffect(() => {
        if(data?.chatroom_arn) {
            getToken();
        }
    }, [data])

    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    useEffect(() => {
        if(chatToken) {
            const room = new ChatRoom({
                id: data.chatroom_arn,
                regionOrUrl: CHAT_REGION,
                tokenProvider: () => { return chatToken;}
            });
            setChatRoom(room);
            room.connect();
        }

    }, [chatToken])

    const handleMessage = async (data) => {
        let time = new Date(data.sendTime);
        let hour = time.getHours();
        let min = time.getMinutes();
        let stat = "am";
        if(hour > 12) {
            hour -= 12;
            stat = "pm";
        }

        const new_message = {
            avatar: data.sender.attributes.avatar,
            user: data.sender.attributes.username == userData?.username ? 'ME': 'OTHER',
            username: data.sender.attributes.username,
            message:data.content,
            donation: false,
            time: `${hour}:${min} ${stat}`,
            onlyEmoji: data.attributes.message_type == 'ONLY-EMOTICON' ? true : false,
            amount: 0
        }

        setMessages((prevState) => {
            return [...prevState, new_message];
        })
    }

    useEffect(() => {
        if (!chatRoom.addListener) {
            return;
        }

        const unsubscribeOnConnected = chatRoom.addListener('connect', () => {
            // Connected to the chat room.
            // renderConnect();
            console.log('Chatroom connected');
        });

        const unsubscribeOnMessageReceived = chatRoom.addListener(
            'message',
            (message) => {
                // Received a message
                handleMessage(message);
                // const messageType = message.attributes?.message_type || 'MESSAGE';
                // switch (messageType) {
                // case 'RAISE_HAND':
                //     handleRaiseHand(message);
                //     break;
                // case 'STICKER':
                //     handleSticker(message);
                //     break;
                // default:
                //     handleMessage(message);
                //     break;
                // }
            }
        );

        return () => {
            unsubscribeOnConnected();
            unsubscribeOnMessageReceived();
        }
    }, [chatRoom])

    const { mutate } = useMutation(getChatToken, {
        onSuccess: data => {
            const _token = {
                token: data.token,
                sessionExpirationTime: new Date(data.sessionExpirationTime),
                tokenExpirationTime: new Date(data.tokenExpirationTime),
            }
            setChatToken(_token);
        },
        onError: ({data}) => {

        },
        onSettled: _ => {
        }
    })

    const getToken = async() => {
        const uuid = uuidv4();
        const params = {
            arn: data.chatroom_arn,
            userId: `${userData?.username}.${uuid}`,
            attributes: {
                username: `${userData?.username}`,
                avatar: `${userData?.avatar}`
            }
        }
        mutate(params);
    }

    const renderMyMessage = (message )=> {
        return (
            <div>
                my Message
            </div>
        )
    }

    const renderOtherMessage = (message) => {
        return (
            <div>
                other Message
            </div>
        )
    }

    const renderMyDonateMessage = (message)  => {
        return (
            <div>
                my Donation Message
            </div>
        )
    }

    const renderOtherDonateMessage = (message) => {
        return (
            <div>
                other Donation Message
            </div>
        )
    }

    const renderMessages = () => {
        return messages.map((message) => {
            switch (message.type) {
                case 'ME':
                    const myMsg = renderMyMessage(message);
                    return myMsg;
                case 'OTHER': 
                    const otherMsg = renderOtherMessage(message);
                    return otherMsg;
                case 'ME-DONATE':
                    const myDonateMsg = renderMyDonateMessage(message);
                    return myDonateMsg;
                case 'OTHER-DONATE':
                    const otherDonateMsg = renderOtherDonateMessage(message);
                    return otherDonateMsg;
                default:
                    break;
            }
        })
    }

    const removeEmoji = str => str.replace(new RegExp(ranges, 'g'), '');

    const isOnlyEmojis = str => !removeEmoji(str).length;

    const handleMessageSend = async () => {
        setEmotOpen(false);
        
        
        const onlyContainEmoji = isOnlyEmojis(message);
        const attributes = {
            message_type: onlyContainEmoji ? 'ONLY-EMOTICON': 'NORMAL',
        };
        const content = `${message.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}`;
        const request = new SendMessageRequest(content, attributes);
        try {
            await chatRoom.sendMessage(request);
          } catch (error) {
            console.log(error);
            // handleError(error);
          }
    }

    const handleEmoticonOpen = () => {
        setEmotOpen( prev => !prev);
    }

    const handleEmojiClick = (e) => {
        setMessage(prev => {
            return prev + e.emoji;
        });
        setEmotOpen(false);
        inputRef?.current.focus();
    }

    const handleMessageChange = (value) => {
        setMessage(value);
    }

    return (
        <>
        <div className={styles.chatForm}>
            <SearchInput fullWidth={true} />
            <div className={styles.chatContent}>
                {
                    messages.map((message, index) => {
                        return <ChatItem data={message} key={index} />
                    })
                }
                <div ref={scrollRef}></div>
            </div>
            <div className={styles.messageBar}>
                {
                    emotOpen && 
                    <div className={styles.emotPad}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                }
                <div className={styles.messageInput}>
                    <MessageInput onSend={handleMessageSend} value={message} onChange={handleMessageChange} inputRef={inputRef} />
                </div>
                <div className={styles.emoticon} onClick={handleEmoticonOpen}>
                    <Smile width={25} height={25} />
                </div>
                <div className={styles.attach}>
                    <Attach width={25} height={25} />
                </div>
                <div className={styles.donation} onClick={() => setOpenDonation(true)}>
                    <Money color={'#141414'} width={25} height={25} />
                </div>
            </div>
        </div>
        {
            openDonation?
            <DonationModal onClose={() => setOpenDonation(false)}/>
            :<></>
        }
        </>
    )
}

export default Chat;