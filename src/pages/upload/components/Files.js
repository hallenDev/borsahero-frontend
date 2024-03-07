import { useState, useEffect, useImperativeHandle, useRef } from 'react';
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from 'uuid';

import styles from './index.module.scss';
import { Upload } from 'ui/svg/icon';
import { H3, PrimaryGreyText } from 'ui/text';
import FileItem from './FileItem';
import { useToast } from 'components/Toast';
import DraggableList from "react-draggable-list";

const GB = 1024 * 1024 * 1024;

const Item = ({...props}) => {
    const { item, itemSelected, dragHandleProps, setFiles, commonProps } = props;
    const { onMouseDown, onTouchStart } = dragHandleProps;
    const { onDelete, onCompleted, onUploadFail, type, firstItem } = commonProps;
    return (
        <FileItem
            file={item} 
            onDelete={onDelete}
            onUploadFail={onUploadFail}
            onCompleted={onCompleted}
            type={type}
            firstItem={firstItem}

            onTouchStart={(e) => {
                e.preventDefault();
                e.target.style.backgroundColor = "blue";
                document.body.style.overflow = "hidden";
                onTouchStart(e);
            }}

            onMouseDown={(e) => {
                document.body.style.overflow = "hidden";
                onMouseDown(e);
            }}
            onTouchEnd={(e) => {
                e.target.style.backgroundColor = "black";
                document.body.style.overflow = "visible";
            }}
            onMouseUp={() => {
                document.body.style.overflow = "visible";
            }}
        />
    )
}

const Files = ({type, onCompleted, onFileChange, ...props}) => {

    const toast = useToast();

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [files, setFiles] = useState([]);
    const [firstItem, setFirstItem] = useState(null);

    useEffect(() => {
        setFirstItem(drafts?.[0]?.id)
    }, [drafts])

    useEffect(() => {
        if(files?.length === drafts?.length) onCompleted(true);
        else onCompleted(false);
    }, [files, drafts])

    useEffect(() => {
        onFileChange(files);
    }, [files])

    const onDelete = (draft, videoId) => {
        setDrafts(_drafts => _drafts.filter(d => d.id !== draft.id))
    
        if (videoId) {
          setFiles(_files => _files.filter(f => f !== videoId));
        }
      }

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: {
            "video/avi": [".avi", ".AVI"],
            "video/mp4": [".mp4", ".MP4", ".mov", ".MOV"],
        },
        onDrop: async acceptedFiles => {
            if(drafts?.length != files?.length) {
                toast.open({
                    type: "error",
                    message: "Please complete the previous forms."
                });
                return;
            }
            if(acceptedFiles.length == 0) {
                toast.open({
                    type: "error",
                    title: "Video format isn't supported.",
                    message: "Please upload a video in .mp4, .mov, or .avi format."
                });
                return;
            }

            if(acceptedFiles[0].size > GB * 5) {
                toast.open({
                    type: "error",
                    title: "File is too large.",
                    message: "Please make sure it's under 5GB and try again."
                });
                return;
            }

            setDrafts(_drafts => [..._drafts, { file: acceptedFiles[0], id: uuidv4() }]);

            setSelectedFiles([
                ...selectedFiles,
                acceptedFiles[0]
            ])
        }
    })

    const containerRef = useRef(null);

    const _onListChange = (newList) => {
        setDrafts(newList);
    };

    const handleDelete = (videoId, file) =>  onDelete(file, videoId);
    const handleUploadFail= (videoId, file) => onDelete(file, videoId);
    const handleCompleted= (videoId, file) => { setFiles([...files, videoId]);};
    const commonProps = {
        onDelete: handleDelete, 
        onUploadFail: handleUploadFail,
        onCompleted: handleCompleted,
        firstItem: firstItem,
        type: type
    }
    return (
        <>
            {
                drafts.length == 0 ?
                    <div className={styles.noFiles}  {...getRootProps()}>
                        <div className={styles.uploadLogo}>
                            <Upload color={"white"} width={25} height={25} />
                        </div>
                        <div className={styles.content}>
                            <H3 value="No files yet" />
                            <PrimaryGreyText value=" .mp4, .mov, or .avi format. Max size is 10GB." />
                        </div>
                    </div>
                    :
                    (
                        // type=="single-video" && drafts.length > 0 ?
                        //     <div className={styles.singleVideoForm}>
                        //         <FileItem 
                        //             file={drafts[0]}
                        //             onDelete={videoId => onDelete(drafts[0], videoId)}
                        //             onUploadFail={videoId => onDelete(drafts[0], videoId)}
                        //             onCompleted={videoId => {
                        //                 // form.setValue('files', [...files, videoId])
                        //                 // form.trigger('files')
                        //                 setFiles([...files, videoId]);
                        //             }}
                        //         />
                        //     </div>
                        //     :
                            <div className={type == "single-video"  ? styles.singleVideoForm : styles.playlistForm} ref={containerRef}>

                                <DraggableList
                                    itemKey="id"
                                    template={Item}
                                    list={drafts}
                                    onMoveEnd={(newList) => _onListChange(newList)}
                                    commonProps={commonProps}
                                    container={() => containerRef.current}
                                />
                                
                                {/* {drafts.map((file, index) => (
                                    <FileItem 
                                        key={index} 
                                        file={file} 
                                        onDelete={videoId => onDelete(file, videoId)}
                                        onUploadFail={videoId => onDelete(file, videoId)}
                                        onCompleted={videoId => {
                                            setFiles([...files, videoId]);
                                        }}
                                    />
                                ))} */}
                                {/* <div className={styles.fileSkeleton}></div> */}
                                {
                                    type != 'single-video' && 
                                    <div className={styles.uploadMore}  {...getRootProps()}>
                                        <Upload width={25} height={25} color={"#946EFF"} />
                                        <span>Upload more</span>
                                    </div>
                                }
                            </div>
                    )
            }
        </>
    )
}

export default Files;