import React, { FC, useState } from 'react';
import { FloatingLabel } from '@/components';

type SendFormProps = {
  className?: string;
  totalBalance: number;
};

const SendForm: FC<SendFormProps> = ({ className, totalBalance }) => {
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const [amountError, setAmountError] = useState(false);
  const [amount, setAmount] = useState<string | null>(null);

  return (
    <form className={`SendForm ${className ? className : ''}`} method="post">
      <FloatingLabel
        type="text"
        className="input-address"
        placeholder="Address"
        errorMessage="Please enter a valid address"
        hasError={addressError}
        setError={setAddressError}
        // eslint-disable-next-line
        pattern={/^0x[a-fA-F0-9]{40}$/}
        setValue={setAddress}
        value={address}
      />

      <FloatingLabel
        type="text"
        className="input-amount"
        placeholder="Amount"
        errorMessage="Please enter a valid amount"
        hasError={amountError}
        value={address}
      />

      <style jsx>
        {`
          .SendForm {
            :global(.input-amount) {
              margin-top: 30px;
            }
          }
        `}
      </style>
    </form>
  );
};

export default SendForm;
