import { useState, useContext, useEffect, useRef } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import { H3, PrimaryGreyText, PrimaryText } from 'ui/text';
import { DeviceSettings, Mic, Cam, ShareScreen, StopCancel, AddStreamer, Close } from 'ui/svg/icon';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import image2 from 'assets/png/image2.png';
import { DefaultInput } from 'ui/input';
import { AuthContext } from 'context/AuthProvider';
import { deleteStream } from 'shared/api/member';
import { getDeviceStore } from 'services/storage.service';
import IVSBroadcastClient from 'amazon-ivs-web-broadcast';

const ShareScreenModal = ({onClose, ...props}) => {

    const selectAction = () => {
        onClose();
    }
    return (
        <div className="modal">
            <div className={styles.shareScreenModalForm}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.content}>
                    <PrimaryText value="Select screen to share" />
                    <div className={styles.screenGroup}>
                        <img src={image2} />
                        <img src={image2} />
                        <img src={image2} />
                    </div>
                </div>
                <div className={styles.actionGroup}>
                    <div className={styles.action}>
                        <NormalPrimaryButton text="Select" onClick={selectAction} />
                    </div>
                    <div className={styles.action}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const StreamerModal = ({onClose, ...props}) => {

    return (
        <div className={styles.streamerModal}>
            <div className={styles.closeBtn} onClick={onClose}>
                <Close width={24} height={24} />
            </div>
            <div className={styles.content}>
                <PrimaryText value="Invite streamer" />
                <PrimaryGreyText value="User’ll receive an email with invitation link to join the stream." />
            </div>
            <DefaultInput placeholder="Email" />
            <div className={styles.actions}>
                <div className={styles.action}>
                    <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                </div>
                <div className={styles.action}>
                    <NormalPrimaryButton text="Invite" onClick={onClose} />
                </div>
            </div>
        </div>
    )
}

const Content = ({data, ...props}) => {
    const navigate = useNavigate();
    
    const streamerRef = useRef(null);
    const viewerRef = useRef(null);
    const clientRef = useRef(null);
    const camRef = useRef(null);
    const micRef = useRef(null);

    const [openShareScreen, setOpenShareScreen] = useState(false);
    const [openAddStreamer, setOpenAddStreamer] = useState(false);

    const [streamer, setStreamer] = useState(null);
    const { userData, isSignedIn } = useContext(AuthContext);
    const [device, setDevice] = useState(getDeviceStore());

    const config = {
        ingestEndpoint: data?.ingest_endpoint,
        streamConfig: IVSBroadcastClient.BASIC_LANDSCAPE,
        logLevel: IVSBroadcastClient.LOG_LEVEL.DEBUG
    }

    useEffect(() => {
        return () => {
            try {
                if (camRef?.current) camRef?.current?.getTracks().forEach((track) => track.stop());
                if (micRef?.current) micRef?.current.getTracks().forEach((track) => track.stop());
                clientRef?.current?.removeVideoInputDevice("camera");
                clientRef?.current?.removeAudioInputDevice("microphone");
            } catch (e) {
                console.log(e);
            }   
        }
    }, [])

    useEffect(() => {
        if(!data) return;
        if(data?.user?.id == userData?.id) setStreamer(true);
        else setStreamer(false);
    }, [data])

    const getCamera = async (deviceId, maxWidth, maxHeight) => {
        let media;
        const videoConstraints = {
          deviceId: deviceId? deviceId : null,
          width: {
            max: maxWidth
          },
          height: {
            max: maxHeight
          }
        };
    
        try {
          media = await navigator.mediaDevices.getUserMedia({
            video: videoConstraints,
            audio: true
          })
    
        } catch (e) {
          console.log('get camera error: ', e);
        }
    
        return media;
      }
      
      const startBroadcasting = async () => {
          try {
            const _client = IVSBroadcastClient.create(config);
            _client.attachPreview(streamerRef.current);
            const { width, height } = config.streamConfig.maxResolution;
            const cameraStream = await getCamera(device.cam, width, height);
            camRef.current = cameraStream;
            await _client.addVideoInputDevice(cameraStream, "camera", {index: 0});
            
            const microphoneStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    deviceId: device.mic
                }
            });
            micRef.current = microphoneStream;
            await _client.addAudioInputDevice(microphoneStream, "microphone");
            clientRef.current = _client;
            await _client.startBroadcast(data.streamkey_value, data.ingest_endpoint);
            console.log('broadcasting started');
        } catch (e) {
            console.log("error: ", e);
        }
    }

    const createAbsolutePath = (assetPath) => {
        return new URL(assetPath, document.URL).toString();
    }

    const startStreamPlay = async () => {
        const { IVSPlayer } = window;
        const { isPlayerSupported } = IVSPlayer ?? {};
        if (isPlayerSupported) {
            const player = IVSPlayer.create();
            player.attachHTMLVideoElement(viewerRef.current);
            console.log(data.playback_url);
            player.load(data.playback_url);
            player.play();
        } else {

        }
    }

    useEffect(() => {
        if(streamer == true) startBroadcasting().then();
        if(streamer == false) {
            startStreamPlay().then();
        }
    }, [streamer])



    const { mutate } = useMutation(deleteStream, {
        onSuccess: data => {
            if (camRef?.current) camRef?.current?.getTracks().forEach((track) => track.stop());
            if (micRef?.current) micRef?.current.getTracks().forEach((track) => track.stop());
            navigate(`/`);
        },
        onError: ({data}) => {

        },
        onSettled: _ => {
        }
    })

    const handleCancelStream = () => {
        if(streamer) {
            mutate(data.id);
        }
    }

    return (
        <>
        <div className={styles.content}>
            
            <div className={styles.video}>
                {
                    streamer ?
                    <canvas className={styles.video} style={{backgroundColor:'black'}} ref={streamerRef}></canvas>
                    :
                    <video className={styles.video} autoPlay playsInline ref={viewerRef}/>
                }
                
                
                {
                    streamer && 

                    <div className={styles.addStreamerForm} >
                        <div className={styles.addStreamer}>
                            <div style={{width:'100%', height:'100%', display:'flex', justifyContent:"center", alignItems:'center'}} onClick={() => setOpenAddStreamer(true)}>
                                <AddStreamer width={25} height={25} />
                            </div>
                            {
                                openAddStreamer ?
                                <StreamerModal onClose={() => setOpenAddStreamer(false)}/>
                                :<></>
                            }
                        </div>
                    </div>
                }
                {
                    streamer &&
                    <div className={styles.actionGroup}>
                        <div className={styles.action}>
                            <DeviceSettings width={25} height={25} />
                        </div>
                        <div className={styles.action}>
                            <Mic width={25} height={25} />
                        </div>
                        <div className={styles.action}>
                            <Cam width={25} height={25} />
                        </div>
                        <div className={styles.action} onClick={() => setOpenShareScreen(true)}>
                            <ShareScreen width={25} height={25} />
                        </div>
                        <div className={styles.close}>
                            <StopCancel width={25} height={25} onClick={handleCancelStream}/>
                        </div>
                    </div>
                }
                
            </div>
            <H3 value={`${data?.user?.first_name ?? ""} ${data?.user?.last_name ?? ""}`} />
            <PrimaryGreyText value={`${data?.user?.bio ?? ""}`} />
        </div>
        {
            openShareScreen?
            <ShareScreenModal onClose={() => setOpenShareScreen(false)}/>
            :<></>
        }
        </>
    )
}

export default Content;