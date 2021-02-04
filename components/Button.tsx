import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const Button: FunctionComponent<ButtonProps & MotionProps> = ({
  label,
  onClick,
  className,
  ...rest
}) => {
  return (
    <>
      <motion.button
        whileTap={{ scale: 0.98 }}
        className={`Button ${className ? className : ''}`}
        onClick={onClick}
        {...rest}>
        {label && <span>{label}</span>}
      </motion.button>
      <style jsx>{`
        :global(.Button) {
          width: fit-content;
          height: 46px;
          min-width: 110px;
          background-color: var(--black);
          border: 2px solid var(--white);
          border-radius: 30px;

          /* flex props */
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          transition: border 0.3s, background 0.3s;

          /** Disabled */

          &:disabled,
          [disabled] {
            opacity: 0.3;
            cursor: not-allowed;
            pointer-events: none;
          }

          @media (hover: hover) {
            &:hover {
              background-color: var(--white);

              span {
                color: var(--black);
              }
            }
          }

          span {
            text-transform: uppercase;
            font-size: calc(51px / var(--retina-value));
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.02;
            letter-spacing: normal;
            text-align: center;
            color: var(--white);
            display: block;
            margin: auto;
          }
        }
      `}</style>
    </>
  );
};

export default Button;
