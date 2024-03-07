import { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { Close, Drag, Edit, Upload, Delete } from 'ui/svg/icon';
import { SmallPrimaryButton, SmallTetriaryBtn } from 'ui/buttons';
import { DefaultInput, BigField } from 'ui/input';
import { SecondaryLabel, ErrorMsg } from 'ui/text';
import uploadLargeFile from 'utils/uploadLargeFile';
import getReadableFileSize from 'utils/getReadableFileSize';
import ProgressBar from 'components/ProgressBar';
import { useDropzone } from "react-dropzone";
import { useMutation } from 'react-query';
import {
    addVideo,
    updateVideo,
    deleteVideo,
} from 'shared/api/member';
import noop from 'utils/noop';
import { useToast } from 'components/Toast';
import defaultCover from 'assets/png/defaultCover.png';

const MB = 1024 * 1024;

const FileItem = ({file, onCompleted = noop, onDelete = noop, onUploadFail =noop, 
    onTouchStart=noop, onMouseDown=noop, onTouchEnd=noop, onMouseUp=noop, type, firstItem}) => {

    const [showContent, setShowContent] = useState(false);

    const [videoUrl, setVideoUrl] = useState('');
    const [videoKey, setVideoKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [coverUpdated, setCoverUpdated] = useState(false);
    
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    
    const [cover, setCover] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [coverError, setCoverError] = useState("");
    const [videoData, setVideoData] = useState({});
    
    const [tmpName, setTmpName] = useState("");
    const [tmpDescription, setTmpDescription] = useState("");
    const [tmpCover, setTmpCover] = useState(null);
    const [tmpCoverImage, setTmpCoverImage] = useState(null);
    
    const toast = useToast();

    
    const { mutate } = useMutation(addVideo, {
        onSuccess: data => {
            setVideoData(data)
            setShowContent(false)
            setCoverUpdated(false)
            onCompleted(data?.id, file)

            setTmpName(name);
            setTmpDescription(description);
            setTmpCover(cover);
            setTmpCoverImage(coverImage)
        },
        onError: ({ data }) => {
            // setError(data?.msg)
        },
        onSettled: _ => {
            setLoading(false)
        },
    })

    const { mutate: updateMutate } = useMutation(updateVideo, {
        onSuccess: data => {
            setVideoData(data)
            setShowContent(false)
            setCoverUpdated(false)

            setTmpName(name);
            setTmpDescription(description);
            setTmpCover(cover);
            setTmpCoverImage(coverImage)
        },
        onError: ({ data }) => {
            // setError(data?.msg)
        },
        onSettled: _ => {
            setLoading(false)
        },
    })

    const handleSave = () => {
        if(loading) return;
        let errorCnt = 0;
        if(name == "") {
            setNameError("This field is required");
            errorCnt ++;
        }

        if(description == "") {
            setDescriptionError("This fields are required");
            errorCnt ++;
        }

        if(!cover) {
            setCoverError("Cover is required");
            errorCnt ++;
        }
        
        if(errorCnt > 0) {
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('video_url', videoUrl);
        formData.append('video_s3_key', videoKey);
        // setShowContent(false);

        formData.append('file', cover);
        setLoading(true);

        if(videoData?.id) {
            updateMutate({ id: videoData.id, formData: formData });
        }
        mutate(formData);
}

    const handleNameChange = (e) => {
        setDescriptionError("");
        setNameError("");
        setName(e.target.value);
    }

    const handleNameClear = () => {
        setName("");
    }

    const handleDescriptionChange = (e) => {
        setDescriptionError("");
        setDescription(e.target.value);
    }

    const handleRemoveCover = () => {
        setCover(null);
    }

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg", ".jpeg"]
        },
        onDrop: async acceptedFiles => {

            if(acceptedFiles.length == 0) {
                toast.open({
                    type: "error",
                    title: "Image format isn't supported.",
                    message: "Please upload a image in .png or .jpg format."
                });
                return;
            }

            if(acceptedFiles[0].size > MB * 24) {

                toast.open({
                    type: "error",
                    title: "File is too large.",
                    message: "Please make sure it's under 24MB and try again."
                });
                return;
            }
            setCoverError("");
            if (acceptedFiles.length > 0) {
                try {
                    setCoverUpdated(true);
                    setCover(acceptedFiles[0]);
                    setCoverImage(URL.createObjectURL(acceptedFiles[0]));
                } catch (error) { }
            }
        }
    })

    useEffect(() => {
        const uploadFile = async () => {
            try {
                setUploading(true);
                await uploadLargeFile(
                    file,
                    progress => setProgress(progress),
                    (url, key) => {
                        setShowContent(true);
                        setUploading(false);
                        setVideoUrl(url);
                        setVideoKey(key);
                    },
                    error => {
                        toast.open({
                            type: "error",
                            // title: "Image format isn't supported.",
                            message: "Error while uploading file"
                        });
                        onUploadFail(videoData?.id, file);
                    },
                )
            } catch (e) {

            }
        }

        if (!videoUrl) {
            uploadFile();
        }

        return () => {
            // ac.abort();
        }
    }, [videoUrl, file])

    const { mutate: deleteMutate } = useMutation(deleteVideo)

    const handleDeleteVideo = () => {
        // ac.abort();
        if (videoData?.id) {
            deleteMutate(videoData?.id)
        }
        onDelete(videoData?.id, file)
    }

    const handleDiscard = () => {
        if(tmpName == "") {
            if (videoData?.id) {
                deleteMutate(videoData?.id)
            }
            onDelete(videoData?.id, file)
        } else {
            setName(tmpName);
            setDescription(tmpDescription);
            setCover(tmpCover);
            setCoverImage(tmpCoverImage);
            setShowContent(false);
        }
    }

    return (
        <div className={styles.fileItem} style={{display: (type=='single-video' && firstItem != file.id)? 'none':'flex'}}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <div 
                        className={styles.dragIcon}
                        onTouchStart={onTouchStart}
                        onMouseDown={onMouseDown}
                        onTouchEnd={onTouchEnd}
                        onMouseUp={onMouseUp}
                    >
                        <Drag width={25} height={25} />
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.filename}>
                            <span>{file?.file.name}</span>
                        </div>
                        {
                            parseInt(progress) != 100 ?
                            <div className={styles.uploadState}>
                                <span>{parseInt(progress) }% Uploading</span>
                                <span>{getReadableFileSize(file.file.size)}</span>
                            </div>
                            :<></>
                        }
                    </div>
                </div>
                <div className={styles.right}>
                    {
                        (!showContent && !uploading) ? 
                        <div className={styles.edit} onClick={() => setShowContent(true)}>
                            <Edit width={25} height={25} />
                        </div>
                        :<></>
                    }
                    
                    {
                        uploading? 
                        <>
                            <div className={styles.progress}>
                                <ProgressBar completed={progress} />
                            </div>
                        </>
                        :<></>
                        

                    }
                    {
                        uploading || !showContent? 
                        <>
                            <div className={styles.close} onClick={handleDeleteVideo}>
                                <Close width={25} height={25} />
                            </div>
                        </>
                        :<></>
                        

                    }
                </div>
            </div>
            {
                showContent ?
                <div className={styles.content}>
                    <div className={styles.detailInput}>
                        <div className={styles.info}>
                            <DefaultInput 
                                placeholder="Name" 
                                value={name} 
                                onChange={handleNameChange}
                                error={nameError}
                                reset={handleNameClear}
                                showError={false}
                                limit={25}
                            />
                            <BigField 
                                placeholder="Description" 
                                limit={250} 
                                value={description} 
                                onChange={handleDescriptionChange}
                                error={descriptionError}
                            />
                        </div>
                        <div className={styles.coverForm}>
                            <div className={coverError? styles.coverError: styles.cover}>
                                {
                                    cover ?
                                    <>
                                        <img src={coverImage} />
                                        <div className={styles.trash} onClick={handleRemoveCover}>
                                            <Delete width={24} height={24} />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <img src={defaultCover} />
                                        <div className={styles.uploadIcon} {...getRootProps()}>
                                            <Upload width={25} height={25} color={"black"} />
                                        </div>
                                    </>
                                }
                            </div>
                            {
                                coverError != "" ?
                                <ErrorMsg value={coverError} />
                                :<></>
                            }
                        </div>
                    </div>
                    <div className={styles.actionGroup}>
                        <div className={styles.action}>
                            <SmallPrimaryButton text="Save" onClick={handleSave} isLoading={loading} />
                        </div>
                        <div className={styles.action}>
                            <SmallTetriaryBtn text="Discard"  onClick={handleDiscard} />
                        </div>
                    </div>
                </div>
                :<></>
            }
        </div>
    )
}

export default FileItem;
