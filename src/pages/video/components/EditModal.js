import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query'

import styles from './EditModal.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText } from 'ui/text';
import { PrimaryInput, BigField } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import noop from 'utils/noop'
import ContentTypeMap from 'shared/types/ContentTypeMap'
import { updateContent } from 'shared/api/member'

const EditModal = ({onClose=noop, onUpdated=noop, content, ...props}) => {

    const [name, setName] = useState(content?.files?.[0].name);
    const [nameError, setNameError] = useState("");
    const [description, setDescription] = useState(content?.files?.[0].description);
    const [desError, setDesError] = useState("");
    const [loading, setLoading] = useState(false)

    const queryClient = useQueryClient()
    const isPlayList = content.type === ContentTypeMap.PLAYLIST

    const { mutate } = useMutation(updateContent, {
        onSuccess: _ => {
            if (isPlayList) {
                queryClient.setQueryData('playlists', contents =>
                    contents?.map(c =>
                    c.id === content.id ? { ...c, title: name, description } : c,
                    ),
                )

                onUpdated({
                    ...content,
                    title: name,
                    description,
                })
            } else {
                queryClient.setQueryData('videos', contents =>
                    contents?.map(c =>
                    c.id === content.id
                        ? {
                            ...c,
                            files: c.files.map(file =>
                            file.id === content.files[0].id
                                ? { ...file, name, description }
                                : file,
                            ),
                        }
                        : c,
                    ),
                )
                onUpdated({
                    ...content,
                    files: [{ ...content.files[0], name, description }],
                })
            }

            onClose()
        },
        onError: ({ data }) => {
            console.log('error while update content: ', data?.msg);
        },
        onSettled: _ => {
            setLoading(false)
        },
    })

    const resetError = () => {
        setNameError("");
        setDesError("");
    }
    const handleNameChange = (e) => {
        resetError();
        setName(e.target.value);
    }

    const handleNameReset = () => {
        resetError();
        setName("");
    }

    const handleDescriptionChange = (e) => {
        resetError();
        setDescription(e.target.value);
    }

    const handleSave = () => {
        let errCnt = 0;
        if(name == "") {
            setNameError("Invalid name");
            errCnt ++;
        }
        if(description == "") {
            setDesError("Invalid description");
            errCnt ++;
        }

        if(errCnt > 0) return;
        setLoading(true);
        const input = {id: content.id, name, description};
        mutate(input)
    }
    
    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={20} height={20} />
                </div>
                <div className={styles.title}>
                    <PrimaryText value="Edit video" />
                </div>
                <div className={styles.content}>
                    <PrimaryInput placeholder="Name" 
                        value={name} 
                        onChange={handleNameChange} 
                        reset={handleNameReset} 
                        error={nameError}
                    />
                    <BigField placeholder="Description" 
                        value={description} 
                        onChange={handleDescriptionChange} 
                        error={desError}
                    />
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose}/>
                    </div>
                    <div className={styles.save}>
                        <NormalPrimaryButton text="Save" onClick={handleSave} isLoading={loading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModal;