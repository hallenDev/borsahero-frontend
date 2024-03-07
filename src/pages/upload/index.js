import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';

import styles from './index.module.scss';
import NavBar from 'components/NavBar';
import { BackBtn, NormalPrimaryButton, NormalTetriaryBtn } from 'ui/buttons';
import { H2, H3, SecondaryText, PrimaryText, PrimaryBold, SecondaryLabel } from 'ui/text';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';
import { DefaultMenu } from 'ui/dropdown';
import { PrimaryInput, BigField } from 'ui/input';
import Files from './components/Files';
import { useToast } from 'components/Toast';

import { uploadContent } from 'shared/api/member'
import { markets } from 'configs/constants';

const contentTypes = [
    {
      label: 'Playlist',
      value: 'playlist',
    },
    {
      label: 'Single video',
      value: 'single-video',
    },
];

const Upload = () => {


    const { state } = useLocation();
    const [contentType, setContentType] = useState('free');
    const [type, setType] = useState(state?.type ?? contentTypes[0].value);
    const [market, setMarket] = useState(markets[0].value);
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [files, setFiles] = useState([]);

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState("");
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    const navigate = useNavigate();
    const toast = useToast();

    const { mutate } = useMutation(uploadContent, {
      onSuccess: data => {
        toast.open({
          type: "success",
          message: "Congrats! The content was successfully uploaded"
        });
        navigate(-1);
      },
      onError: ({ data }) => {},
      onSettled: _ => {
        setLoading(false)
      },
    })

    const handleTitleChange = (e) => {
      setTitleError("");
      setTitle(e.target.value);
    }

    const handleTitleClear = () => {
      setTitleError("");
      setTitle("");
    }

    const handleDescriptionChange = (e) => {
      setDescriptionError("");
      setDescription(e.target.value);
    }

    const handleSave = () => {

      let errorCnt = 0;
      if(type == 'playlist') {
        if(title == "") {
          setTitleError("This field is required");
          errorCnt ++;
        }

        if(description == "") {
          setDescriptionError("This field is required");
          errorCnt ++;
        }
      }

      if(files.length == 0) {
        toast.open({
            type: "error",
            message: "No files selected"
        });
        errorCnt++;
    }

      if(errorCnt > 0) return;

      if (!isCompleted) {
        toast.open({
          type: "error",
          message: "Please complete all the video forms"
        });
        return;
      }

      setLoading(true);

      mutate({
        type: type,
        market: market,
        title: title,
        description: description,
        files: files,
        content_type: contentType,
      })
    }

    const handleCancel = () => {
      navigate(-1);
    }

    return (
        <div style={{position:'relative'}}>
            <NavBar />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.deskTitle}>
                        <BackBtn />
                        <H2 value="Upload content" />
                    </div>
                    <div className={styles.mobTitle}>
                        <BackBtn />
                            <H3 value="Upload content" />
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className={styles.pageContent}>
                    <div className={styles.contentInfo}>
                        <H3 value="Content info" />
                        <div className={styles.detailPad}>
                            <DefaultMenu label="Content type" data={contentTypes} onChange={setType} defaultValue={type} />
                            <DefaultMenu label="Market" data={markets} onChange={setMarket} />
                            {
                              type=='playlist' && 
                              <PrimaryInput 
                                placeholder="Title" 
                                label="Title" 
                                value={title} 
                                onChange={handleTitleChange}
                                reset={handleTitleClear}
                                error={titleError}
                                limit={25}
                              />
                            }
                            <div className={styles.paidStatus}>
                                <span>Content type</span>
                                <div className={styles.select}>
                                    <div className={contentType == 'paid'? styles.optionSelect: styles.option} onClick={() => setContentType('paid')}>Paid</div>
                                    <div className={contentType == 'free'? styles.optionSelect: styles.option} onClick={() => setContentType('free')}>Free</div>
                                </div>
                            </div>
                            {
                                type=='playlist' && 
                                <BigField 
                                  label="Description" 
                                  value={description}
                                  onChange={handleDescriptionChange}
                                  error={descriptionError}
                                  limit={250}
                                />
                            }
                        </div>
                    </div>
                    <div className={styles.files}>
                        <H3 value="Files" />
                        <Files type={type} onCompleted={setIsCompleted} onFileChange={setFiles}/>
                        <div className={styles.action}>
                            <div className={styles.upload}>
                                <NormalPrimaryButton text="Upload" onClick={handleSave} isLoading={loading} />
                            </div>
                            <div className={styles.cancel}>
                                <NormalTetriaryBtn text="Cancel" onClick={handleCancel} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload;