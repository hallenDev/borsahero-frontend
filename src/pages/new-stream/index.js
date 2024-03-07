import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import NavBar from 'components/NavBar';
import { BackBtn } from 'ui/buttons';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';
import { H2, H3, PrimaryText, PrimaryGreyText } from 'ui/text';
import { NormalPrimaryButton, NormalTetriaryBtn, RadioButtonGroup } from 'ui/buttons';
import { DefaultInput, BigField } from 'ui/input';
import { DefaultMenu } from 'ui/dropdown';
import { SecondaryLabel } from 'ui/text';
import { Upload, Mic, Cam, CamOff, MicOff, Close, PaidContent } from 'ui/svg/icon';
import { useDropzone } from "react-dropzone";
import defaultCover from 'assets/png/defaultCover.png';

import styles from './index.module.scss';
import { markets } from 'configs/constants';
import { useToast } from 'components/Toast';
import { createStream } from 'shared/api/member';
import { getDeviceStore, setDeviceStore } from 'services/storage.service';
import RequestSubscribeModal from 'components/RequestSubscribeModal';
import { getSubscription } from 'shared/api/member';

const items = [
    {
        label:'Free'
    },
    {
        label: 'Paid'
    }
]

const MB = 1024 * 1024;

const defaultDevice = {
    mic: null,
    cam: null
};

const NewStream = () => {

    const navigate = useNavigate();
    const toast = useToast();
    const videoRef = useRef(null);
    const camRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {

        return () => {
            if (camRef?.current) camRef?.current.getTracks().forEach((track) => track.stop());
            if (audioRef?.current) audioRef?.current.getTracks().forEach((track) => track.stop());
        }
    }, [])

    const { data = null } = useQuery('subscription', getSubscription, {
        onError: error => {
            console.log(error)
        },
    });    

    const [step, setStep] = useState(0);

    const [coverFile, setCoverFile] = useState(null);
    const [requestSubscribe, setRequestSubscribe] = useState(false);

    useEffect(() => {
        if(data != null) {
            if(data.subscription == null || data.subscription.ended_at && data.subscription.is_cancelled) {
                setRequestSubscribe(true);
            }
        }
    }, [data])

    const [streamData, setStreamData] = useState({
        cover: null,
        title: '',
        type: 'free',
        market: markets[0].value,
        description: ''
    });

    const [streamError, setStreamError] = useState({
        title: '',
        description: ''
    });

    const [camDevices, setCamDevices] = useState([]);
    const [micDevices, setMicDevices] = useState([]);
    const [device, setDevice] = useState( getDeviceStore(defaultDevice) );
    const [deviceStat, setDeviceStat] = useState({
        cam: true,
        mic: true,
    })
    const [loading, setLoading] = useState(false);

    const handleCoverDelete = () => {
        setStreamData({
            ...streamData,
            cover: null
        });
        setCoverFile(null);
    }

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/heic": [".heic"]
        },
        onDrop: async acceptedFiles => {
            if (acceptedFiles.length > 0) {
                if(acceptedFiles[0].size > MB * 5) {
                    toast.open({
                        type: "error",
                        title: "File is too large.",
                        message: "Please make sure it's under 5MB and try again."
                    });
                    return;
                }
                try {                   
                    setStreamData({
                        ...streamData,
                        cover: URL.createObjectURL(acceptedFiles[0])
                    });
                    setCoverFile(acceptedFiles[0]);
                } catch (error) { }
            } else {
                toast.open({
                    type: "error",
                    title: "Cover image format isn't supported.",
                    message: "Please upload image in .png .jpg or .heic"
                });
                return;
            }
        }
    })

    const getDevice = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const _camDevices = devices.filter((d) => d.kind === "videoinput" && d.deviceId != "");
            const _micDevices = devices.filter((d) => d.kind === "audioinput" && d.deviceId != "");
            setCamDevices(_camDevices);
            setMicDevices(_micDevices);
            setDevice({
                cam: _camDevices?.[0]?.deviceId ?? null,
                mic: _micDevices?.[0]?.deviceId ?? null,
            })
        } catch (e) {
            console.log(e);
        }
    }

    const getCamera = async (deviceId, maxWidth = 1024, maxHeight = 768) => {
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
                audio: false
            })
            camRef.current = media;
            videoRef.current.srcObject = media;
        } catch (e) {
          console.log('get camera error: ', e);
        }
    }

    const getMic = async (deviceId) => {
        try {
            const microphoneStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                  deviceId: deviceId
                }
            });
            audioRef.current = microphoneStream;
        } catch (e) {
            console.log(e);
        }
        
    }

    const goDeviceSetting = async () => {

        setStreamError({
            ...streamError,
            title: streamData.title == "" ? "This field is required" : "",
            description: streamData.description == "" ? "This field is required" : ""
        });
        if(streamData.title == "" || streamData.description == "") {
            return;
        }
        setStep(1);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            stream.getTracks().forEach((track) => track.stop());
        } catch (e) {
            console.log('error while accessing device: ', e);
        }

        try{
            const devices = await navigator.mediaDevices.enumerateDevices();
            const _camDevices = devices.filter((d) => d.kind === "videoinput" && d.deviceId != "");
            const _micDevices = devices.filter((d) => d.kind === "audioinput" && d.deviceId != "");
            setDevice({
                cam: _camDevices?.[0]?.deviceId ?? null,
                mic: _micDevices?.[0]?.deviceId ?? null,
            })
            setCamDevices(_camDevices);
            setMicDevices(_micDevices);
            
            if(deviceStat.cam && _camDevices?.[0]?.deviceId != null) { await getCamera(_camDevices?.[0]?.deviceId); }
            if(deviceStat.mic && _micDevices?.[0]?.deviceId != null) { await getMic(_micDevices?.[0]?.deviceId); }
        } catch (e) {
            console.log(e);
        }
        
    }

    const { mutate } = useMutation(createStream, {
        onSuccess: data => {
            const state = {data: data};
            setDeviceStore(device);
            if (camRef?.current) camRef?.current.getTracks().forEach((track) => track.stop());
            if (audioRef?.current) audioRef?.current.getTracks().forEach((track) => track.stop());
            navigate(`/stream/${data.id}`, {state});
        },
        onError: ({data}) => {

        },
        onSettled: _ => {
            setLoading(false);
        }
    })

    const goLive = () => {
        if(!device.cam || !device.mic) {
            toast.open({
                type: "error",
                title: "Device Error",
                message: "Please make sure mic and camera is allowed to use."
            });
            return;
        }

        const formData = new FormData();
        formData.append('title', streamData.title);
        formData.append('type', streamData.type);
        formData.append('market', streamData.market);
        formData.append('description', streamData.description);

        if(coverFile) {
            formData.append('file', coverFile);
        }

        setLoading(true);

        mutate(formData);
    }

    const handleChange = (e) => {
        setStreamData({
            ...streamData,
            [e.target.name]: e.target.value
        });

        setStreamError({
            ...streamError,
            [e.target.name]: e.target.value=="" ? "This field is required" : ""
        })
    }

    const handleTypeChange = (value) => {
        setStreamData({
            ...streamData,
            type: value
        });
    }

    const handleMicChange = async (deviceId) => {
        setDevice({
            ...device,
            mic: deviceId
        })
        if (audioRef?.current) audioRef?.current.getTracks().forEach((track) => track.stop());
        if (deviceStat.mic) await getMic(deviceId);
    }

    const handleCameraChange = async (deviceId) => {
        setDevice({
            ...device,
            cam: deviceId
        })
        if (videoRef?.current?.srcObject) videoRef?.current?.srcObject.getTracks().forEach((track) => track.stop());
        if(deviceStat.cam) await getCamera(deviceId);
    }

    const handleTurnCamera = async () => {
        if(deviceStat.cam == false) {
            await getCamera(device.cam);
        } else {
            if(videoRef?.current?.srcObject) videoRef.current.srcObject.getTracks().forEach((track) => {track.stop()});
        }
        setDeviceStat(prevState => ({
            ...prevState,
            cam: !prevState.cam
        }))
    }

    const handleTurnMic = async () => {
        if(deviceStat.mic == false) {
            await getMic(device.mic);
        } else {
            if(audioRef.current) audioRef.current.getTracks().forEach((track) => {track.stop()});
        }
        setDeviceStat(prevState => ({
            ...prevState,
            mic: !prevState.mic
        }))
    }

    const handleBackAction = () => {
        if(step == 1) {
            if (videoRef?.current?.srcObject) videoRef?.current?.srcObject.getTracks().forEach((track) => track.stop());
            if (audioRef?.current) audioRef?.current.getTracks().forEach((track) => track.stop());
        }
        if(step > 0) setStep(prev => prev - 1);
        else navigate(-1);
    }

    const handleReturn = () => {
        if (videoRef?.current?.srcObject) videoRef?.current?.srcObject.getTracks().forEach((track) => track.stop());
        if (audioRef?.current) audioRef?.current.getTracks().forEach((track) => track.stop());
        navigate(-1);
    }

    const handleRequestSubscribeClose = () => {
        navigate(-1);
    }

    return (
        <>
            <NavBar tab="income"/>
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.deskTitle}>
                        <BackBtn onClick={handleBackAction} />
                        <H2 value="New Stream" />
                    </div>
                    <div className={styles.mobTitle}>
                        <BackBtn onClick={handleBackAction} />
                        <H3 value="New Stream" />
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className="pageContent">
                    {
                        step == 0 ?
                        <div className={styles.streamPad}>
                            <div className={styles.Content}>
                                {/* <div className={streamError.cover == "" ? styles.cover:styles.errorCover}> */}
                                <div className={styles.cover}>
                                    <img src={streamData.cover ?? defaultCover} />
                                    {
                                        streamData.cover && 
                                        <div className={styles.delete} onClick={handleCoverDelete}>
                                            <Close color={'black'} width={20} height={20} />
                                        </div>
                                    }
                                    {
                                        !streamData.cover && 
                                        <div className={styles.upload}>
                                            <div className={styles.uploadIcon} {...getRootProps()}>
                                                <Upload color={"black"} width={24} height={24} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className={styles.detail}>
                                    <DefaultInput 
                                        label="Title" 
                                        placeholder="Title" 
                                        value={streamData.title} 
                                        name="title" 
                                        onChange={handleChange}
                                        error={streamError.title}
                                        limit={25}
                                    />
                                    {/* <RadioButtonGroup items={items} label="Video type" /> */}
                                    <div className={styles.videoType}>
                                        <span className={styles.title}>Video type</span>
                                        <div className={styles.typeGroup}>
                                            <div className={streamData.type=='paid'? styles.itemSelected: styles.item} onClick={() => handleTypeChange('paid')}>
                                                <PaidContent width={20} height={20} color={'#946EFF'} /><span>Paid</span>
                                            </div>
                                            <div className={streamData.type=='free' ? styles.itemSelected: styles.item} onClick={() => handleTypeChange('free')}>
                                                <span>Free</span>
                                            </div>
                                        </div>
                                    </div>
                                    <DefaultMenu label="Market" data={markets} value={streamData.market} />
                                    <BigField 
                                        label="Description" 
                                        placeholder="Description" 
                                        value={streamData.description} 
                                        name="description" 
                                        onChange={handleChange}
                                        error={streamError.description} 
                                        limit={250}
                                    />
                                </div>

                            </div>
                            <div className={styles.action}>
                                <div className={styles.next}>
                                    <NormalPrimaryButton text="Next" onClick={goDeviceSetting} />
                                </div>
                                <div className={styles.cancel}>
                                    <NormalTetriaryBtn text="Cancel" onClick={handleReturn} />
                                </div>
                            </div>
                        </div>
                        :
                        <div className={styles.devicePad}>
                            <div className={styles.content}>
                                {
                                    (camDevices.length > 0 && camDevices[0].deviceId != "") ? 
                                    <div className={styles.cameraPreview}>
                                        <video ref={videoRef} className={styles.videoTag} autoPlay={true} />
                                        <div className={styles.deviceOption}>
                                            <div className={styles.btn} onClick={handleTurnMic}>
                                                {
                                                    deviceStat.mic ? 
                                                    <Mic width={20} height={20} />
                                                    :<MicOff width={20} height={20} />
                                                }
                                            </div>
                                            <div className={styles.btn} onClick={handleTurnCamera}>
                                                {
                                                    deviceStat.cam ?
                                                    <Cam width={20} height={20} />
                                                    :<CamOff width={20} height={20} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={styles.cameraError}>
                                        <div className={styles.error}>
                                            <Close width={24} height={24} />
                                        </div>
                                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'2px'}}>
                                            <PrimaryText value="Devices aren’t available or are being used by another application. " />
                                            <PrimaryGreyText value="Please fix your devices in your browser settings" />
                                        </div>
                                    </div>
                                }
                                <div className={styles.devices}>
                                    <DefaultMenu 
                                        label="Mic" 
                                        data={micDevices} 
                                        defaultValue={micDevices?.[0]?.deviceId} 
                                        emptyMsg="Mic is unavailable"
                                        onChange={handleMicChange}
                                    />
                                    <DefaultMenu 
                                        label="Camera" 
                                        data={camDevices} 
                                        defaultValue={camDevices?.[0]?.deviceId} 
                                        emptyMsg="Camera is unavailable"
                                        onChange={handleCameraChange}
                                    />
                                    {/* <DefaultMenu label="Speaker" /> */}
                                </div>
                            </div>
                            <div className={styles.action}>
                                <div className={styles.goLive}>
                                    <NormalPrimaryButton text="Go live" onClick={goLive} isLoading={loading} />
                                </div>
                                <div className={styles.return}>
                                    <NormalTetriaryBtn text="Return" onClick={handleReturn} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {
                requestSubscribe && 
                <RequestSubscribeModal onClose={handleRequestSubscribeClose}/>
            }
        </>
    )
}

export default NewStream;