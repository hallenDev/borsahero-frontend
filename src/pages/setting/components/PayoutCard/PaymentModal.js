import { useEffect, useState } from 'react';
import {Elements, CardElement, useStripe, useElements, PaymentElement  } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import styles from './PaymentModal.module.scss';
import { Close } from 'ui/svg/icon';
import { PrimaryText, PrimaryGreyText } from 'ui/text';
import { PrimaryInput, PasswordInput } from 'ui/input';
import { NormalTetriaryBtn, NormalPrimaryButton } from 'ui/buttons';
import { CreditLogo } from 'ui/svg/logo';
import { createSetupIntentSecret } from 'shared/api/member'
import { STRIPE_PUBLISHABLE_KEY } from 'configs/constants';
import { useToast } from 'components/Toast';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CardForm = ({onClose, ...props}) => {

    const toast = useToast();

    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);


    const [holder, setHolder] = useState({
        value: "",
        error: "",
    })

    const handleSubmit = async () => {
        if(holder.value=="") {
            setHolder({
                value:"",
                error:"This field is required."
            })
            return;
        }
        try {
            if (!stripe || !elements) {
                return;
            }
            setLoading(true);

            const {setupIntent: clientSecret} = await createSetupIntentSecret();
            const result = await stripe.confirmCardSetup(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: holder.value
                    }
                }
            });

            if(result.error) {
                toast.open({
                    type: "error",
                    message: `${result.error.message}`
                })
            } else {
                toast.open({
                    type: "success",
                    message: "Payment attached successfully."
                })
                onClose();
            }
            setLoading(false);
            
        } catch (e) {
            // console.log('error while setting payment: ', e);
            toast.open({
                type: "error",
                message: "Error while attaching payment"
            });
            setLoading(false);
        }
    }

    const handleOnChange = (e) => {
        setHolder({
            value: e.target.value,
            error: e.target.value == "" ? "This field is required!" : ""
        })
    }

    const handleReset = () => {
        setHolder({
            value: "",
            error: "This field is required!",
        })
    }

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "white",
            fontSmoothing: "antialiased",
            fontSize: "14px",
          },
          invalid: {
            color: "red",
            iconColor: "#fa755a",
          },
        },
    };

    return (
        <>
            <CardElement className="card" options={CARD_ELEMENT_OPTIONS} />
            <PrimaryInput 
                placeholder="Add name" 
                name="card_holder" 
                onChange={handleOnChange} 
                limit={25} 
                value={holder.value}
                error={holder.error}
                reset={handleReset}
            />
            <div className={styles.footer}>
                <div className={styles.cancel}>
                    <NormalTetriaryBtn text="Cancel" onClick={onClose} />
                </div>
                <div className={styles.save}>
                    <NormalPrimaryButton text="Save" isLoading={loading} onClick={handleSubmit} />
                </div>
            </div>
        </>
    )
}

const PaymentModal = ({onClose, onSuccess, ...props}) => {

    return (
        <div className="modal">
            <div className={styles.wrapper}>
                <div className={styles.backBtn} onClick={onClose}>
                    <Close width={24} height={24} />
                </div>
                <div className={styles.header}>
                    <PrimaryText value="Add payment details" />
                </div>
                
                <div className={styles.body}>
                    <Elements stripe={stripePromise}>
                        <CardForm onClose={onClose} />
                    </Elements>
                </div>
            </div>
        </div>
    )
}

export default PaymentModal;