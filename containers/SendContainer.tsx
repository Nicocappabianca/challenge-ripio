import React, { FC } from 'react';
import { SendForm } from '@/components';

const SendContainer: FC = () => {
  const totalBalance = 200;
  const currency = 'eth';

  return (
    <section className="Send">
      <div className="container">
        <div className="balance">
          <h2>total balance</h2>
          <div className="amount">
            <span>
              <img src="/icons/eth.svg" alt="ETH" />
            </span>
            {totalBalance.toFixed(4)}
            <span className="currency">&nbsp;{currency}</span>
          </div>
        </div>

        <SendForm totalBalance={totalBalance} className="send_form" />
      </div>

      <style jsx>
        {`
          .Send {
            padding-top: 40px;

            .container {
              max-width: 90%;
              margin: 0 auto;
              display: flex;
              flex-direction: column;

              @media (--large) {
                max-width: 1200px;
                flex-direction: row;
                justify-content: space-around;
              }

              .balance {
                img {
                  display: inline-block;
                  margin-right: 10px;
                }

                h2 {
                  text-transform: uppercase;
                  font-size: 20px;
                }

                .amount {
                  font-size: 42px;
                  font-weight: bold;

                  .currency {
                    font-size: 18px;
                    text-transform: uppercase;
                    letter-spacing: 2.5px;
                  }
                }
              }
            }

            :global(.send_form) {
              width: 50%;
            }
          }
        `}
      </style>
    </section>
  );
};

export default SendContainer;