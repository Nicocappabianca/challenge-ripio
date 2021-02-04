import React, { FC, useState, useEffect, FormEvent } from 'react';
import { FloatingLabel, Button } from '@/components';
import axios from 'axios';

type SendFormProps = {
  className?: string;
  totalBalance: number;
  setBalance: any;
  fee: number;
};

type Transaction = {
  amount: number;
  address: string;
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

  /* transactions array */
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

    /* --> UNCOMMENT THIS FOR TESTING THE UI WITHOUT API <-- 
    setBalance(totalBalance - amount - fee);
    setTransactions(transactions => [...transactions, { amount: amount, address: address as string}]); 
    setAmount(0);
    setAddress(null);
    return; */

    if (address && amount) {
      setProcessingSubmit(true);
      setButtonText('sending...');
      axios
        /* here should be placed the URL of the real api */
        .post('/api/sendAmount', { address: address, amount: amount })
        .then(() => {
          setProcessingSubmit(false);
          setButtonText('send');

          /* subtract transaction from total balance */
          setBalance(totalBalance - amount - fee);

          /* set the new transaction */
          setTransactions((transactions) => [
            ...transactions,
            { amount: amount, address: address as string }
          ]);
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

      <ul className="transactions_list">
        {transactions.map((transaction: Transaction, index: number) => (
          <li key={index} className="transaction">
            <h4>Transaction #{index + 1}</h4>
            <p>
              Amount sent: <b>{transaction.amount} ETH</b>
            </p>
            <p>
              Receiving address: <b>{transaction.address}</b>
            </p>
          </li>
        ))}
      </ul>

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

            .transactions_list {
              padding-top: 30px;
              overflow-x: auto;
              white-space: nowrap;

              .transaction {
                padding-top: 15px;
              }
            }
          }
        `}
      </style>
    </form>
  );
};

export default SendForm;
