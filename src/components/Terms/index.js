import styles from './index.module.scss';

import { Close } from 'ui/svg/icon';
import  { H2, H3, PrimaryBold, PrimaryText } from 'ui/text';

const termsData = [
    {
        title: "1. Acceptance of Terms",
        content: "By downloading, accessing, or using [Trading App Name], you agree to comply with and be bound by the following Terms and Conditions. If you do not agree to these terms, please refrain from using the app."
    },
    {
        title: "2. Eligibility",
        content: "You must be at least 18 years old and legally able to enter into contracts to use [Trading App Name]. By using the app, you affirm that you meet these eligibility requirements. If you are accessing [Trading App Name] on behalf of a business or other entity, you represent and warrant that you have the authority to bind that entity to these terms."
    },
    {
        title: "3. User Account",
        content: "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use or security breach. We reserve the right to suspend or terminate your account if we suspect any unauthorized activity."
    },
    {
        title: "4. Trading Risks",
        content: "You acknowledge that trading involves inherent risks, and past performance does not guarantee future results. [Trading App Name] is a tool for executing trades, and you are solely responsible for your trading decisions. We do not provide financial advice, and any information provided through the app is for educational purposes only."
    },
    {
        title: "5. Compliance with Laws",
        content: "You agree to comply with all applicable laws, regulations, and third-party agreements when using [Trading App Name]. This includes, but is not limited to, financial regulations and tax obligations. You are solely responsible for ensuring that your use of the app is in compliance with all applicable laws."
    }
]

const Terms = ({setIsOpen}) => {

    return (
        <>
            <div className={styles.TermsBackground}>
                <div className={styles.modalWrapper}>
                    <div className={styles.modalHeader}>
                        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                            <Close color={'white'} width={24} height={24} />
                        </button>
                    </div>
                    <div className={styles.modalTitle}>
                        <div className={styles.deskTitle}>
                            <H2 value="Terms & Conditions" />
                        </div>
                        <div className={styles.mobTitle}>
                            <H3 value="Terms & Conditions" />
                        </div>
                    </div>
                    <div className={styles.modalContent}>
                        {
                            termsData.map((item, index) => (
                                <div key={index} className={styles.itemWrapper}>
                                    <div className={styles.deskTitle}>
                                        <H3 value={item.title} />
                                    </div>
                                    <div className={styles.mobTitle}>
                                        <PrimaryBold value={item.title} />
                                    </div>
                                    <div className={styles.content}>
                                        <PrimaryText value={item.content} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Terms;