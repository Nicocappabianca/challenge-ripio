import React, { FC, useState, useEffect } from 'react';
import { FloatingLabel, Button } from '@/components';

type SendFormProps = {
  className?: string;
  totalBalance: number;
  fee: number;
};

const SendForm: FC<SendFormProps> = ({ className, totalBalance, fee }) => {
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const [amountError, setAmountError] = useState(false);
  const [amount, setAmount] = useState<number>(0);

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

  return (
    <form className={`SendForm ${className ? className : ''}`} method="post">
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

      <Button label={`Send`} className="send_button" />

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
