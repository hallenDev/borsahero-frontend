import { useState } from 'react';

import NavBar from 'components/NavBar';
import styles from './index.module.scss';
import { H2, H3, SecondaryText, PrimaryText, PrimaryBold, SecondaryLabel } from 'ui/text';
import { BackBtn, NormalPrimaryButton } from 'ui/buttons';
import LiveButton from 'components/LiveButton';
import Account from 'components/Account';
import avatar1 from 'assets/png/avatar1.png';
import ReviewCard from './components/ReviewCard';
import { Rating } from 'react-simple-star-rating';
import { Filter, Down } from 'ui/svg/icon';

import AddReviewModal from './components/AddReviewModal';
import DeleteModal from './components/DeleteModal';

const Reviews = () => {

    const [openReview, setOpenReview] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);


    return (
        <div style={{position:'relative'}}>
            <NavBar />
            <div className="pageContainer">
                <div className={styles.header}>
                    <div className={styles.deskTitle}>
                        <BackBtn />
                        <div style={{display:'flex', gap: '8px', alignItems:'baseline'}}>
                            <H2 value="Reviews" />
                            <SecondaryText value="70" />
                        </div>
                    </div>
                    <div className={styles.mobTitle}>
                        <BackBtn />
                        <div style={{display:'flex', gap: '4px', alignItems:'baseline'}}>
                            <H3 value="Reviews" />
                            <SecondaryText value="70" />
                        </div>
                    </div>
                    <div className={styles.rightHeader}>
                        <LiveButton />
                        <div className={styles.line} />
                        <Account />
                    </div>
                </div>
                <div className="pageContent">
                    <div className={styles.userWrapper}>
                        <div className={styles.userSection}>
                            <img src={avatar1} className={styles.avatar} />
                            <PrimaryBold value="Wilson Vaccaro" />
                            <div className={styles.ratingWapper}>
                                <Rating iconsCount={1} size={19} readonly={true} />
                                <PrimaryText value="4.3" />
                            </div>
                        </div>
                        <div className={styles.actSection}>
                            <div className={styles.filterWrapper}>
                                <div className={styles.filter}>
                                    <Filter width={22} height={22} />
                                    <SecondaryLabel value={"Recent first"} />
                                </div>
                                <Down width={22} height={22} />
                            </div>
                            <div style={{width:'96px'}}>
                                <NormalPrimaryButton text="Add review" onClick={() => setOpenReview(true)} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.reviewList}>
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                        <ReviewCard onClickDelete={() => {setOpenDelete(true)}} />
                    </div>
                </div>
            </div>
            {
                openReview ?
                <AddReviewModal onClose={() => setOpenReview(false)}/> :<></>
            }
            {
                openDelete ?
                <DeleteModal onClose={() => setOpenDelete(false)}/> :<> </>
            }
        </div>
    )
}

export default Reviews;