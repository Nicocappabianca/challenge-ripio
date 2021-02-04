import React, { FC, useState, useEffect, FormEvent } from 'react';
import { FloatingLabel, Button } from '@/components';
import axios from 'axios';

type SendFormProps = {
  className?: string;
  totalBalance: number;
  setBalance: any;
  fee: number;
};

const SendForm: FC<SendFormProps> = ({ className, totalBalance, fee, setBalance }) => {
  /* address values */
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  /* amount values */
  const [amountError, setAmountError] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  /* submit values */
  const [processingSubmit, setProcessingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [buttonText, setButtonText] = useState('send');

  useEffect(() => {
    if (amount < 0 || amount > totalBalance - fee || isNaN(amount)) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  }, [amount]);

  useEffect(() => {
    if (address && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setAddressError(true);
    } else {
      setAddressError(false);
    }
  }, [address]);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (address && amount) {
      setProcessingSubmit(true);
      setButtonText('sending...');
      axios
        .post('/api/sendAmount', { address: address, amount: amount })
        .then(() => {
          setProcessingSubmit(false);
          setButtonText('send');

          /* subtract transaction from total balance */
          setBalance(totalBalance - amount - fee);
        })
        .catch(() => {
          setProcessingSubmit(false);
          setSubmitError(true);
          setButtonText('¡Error!');
        });
    } else {
      setProcessingSubmit(false);
      setSubmitError(true);
      setButtonText('¡Error!');
    }

    setAmount(0);
    setAddress(null);
  };

  return (
    <form className={`SendForm ${className ? className : ''}`} method="post" onSubmit={handleSend}>
      <FloatingLabel
        type="text"
        className="input-address"
        placeholder="Address"
        errorMessage="Please enter a valid address"
        hasError={addressError}
        setValue={setAddress}
        value={address}
      />

      <FloatingLabel
        type="text"
        className="input-amount"
        placeholder="Amount"
        errorMessage="Please enter a valid amount"
        hasError={amountError}
        setValue={setAmount}
        value={amount}
      />
      <p className="fee">Fee: {fee.toFixed(4)}</p>

      <Button
        label={buttonText}
        className="send_button"
        disabled={
          amountError || addressError || !amount || !address || submitError || processingSubmit
        }
      />

      <style jsx>
        {`
          .SendForm {
            padding-top: 30px;

            @media (--large) {
              padding-top: 0px;
            }

            :global(.input-amount) {
              margin-top: 30px;
            }

            .fee {
              margin-top: 10px;
              text-align: right;
              font-size: 12px;
            }

            :global(.send_button) {
              margin: 20px auto 0 auto;

              @media (--large) {
                margin: 20px 0 0 0;
              }
            }
          }
        `}
      </style>
    </form>
  );
};

export default SendForm;
