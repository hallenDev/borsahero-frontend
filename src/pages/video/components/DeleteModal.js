import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query'

import styles from './DeleteModal.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { PrimaryInput, BigField } from 'ui/input';
import { NormalTetriaryBtn, NormalDestructiveBtn } from 'ui/buttons';
import { useToast } from 'components/Toast';
import ContentTypeMap from 'shared/types/ContentTypeMap'
import { deleteContent } from 'shared/api/member'
import noop from 'utils/noop'

const DeleteModal = ({onClose=noop, onDeleted=noop, content, ...props}) => {

    const toast = useToast();

    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient();

    const { mutate } = useMutation(deleteContent, {
        onSuccess: _ => {
            queryClient.setQueryData(
                [
                    content.type === ContentTypeMap.PLAYLIST ? 'playlists' : 'videos',
                    content?.user?.id
                ],
                contents => contents.filter(c => c.id !== content.id),
            )

            toast.open({
                type: "error",
                message: `Video was deleted`
            });
            onDeleted()
            onClose()
        },
        onError: ({ data }) => {
            console.log("error while deleting content: ", data?.msg);
        },
        onSettled: _ => {
            setLoading(false)
        },
    })

    const deleteAction = () => {
        setLoading(true)
        mutate(content.id)
    }
    
    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.closeBtn} onClick={onClose}>
                    <Close width={20} height={20} />
                </div>
                <div className={styles.title}>
                    <PrimaryText value="Delete video?" />
                    <PrimaryGreyText value="This is a one-way ticket – no turning back!" />
                </div>
                <div className={styles.footer}>
                    <div className={styles.cancel}>
                        <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                    </div>
                    <div className={styles.save}>
                        <NormalDestructiveBtn text="Delete" onClick={deleteAction} isLoading={loading} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;