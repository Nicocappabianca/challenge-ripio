import css from 'styled-jsx/css';
import { Colors } from './constants';

export const globalStyles = css.global`
  /* root vars */
  :root {
    --black: ${Colors.black.toCSS()};
    --white: ${Colors.white.toCSS()};
    --dark-gray: ${Colors.darkGray.toCSS()};

    /* Fonts */
    /* ubuntu_regular */
    /* ubuntu_bold */
    --f-ubuntu-regular: 'ubuntu_regular';
    --f-ubuntu-bold: 'ubuntu_bold';

    font-size: 16px;

    --header-height: 65px;
    --footer-height: 71px;
    --layout-pt: 0px;

    @media (--large) {
      --layout-pt: 40px;
      --header-height: 88px;
      --footer-height: 73.2px;
    }
  }

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul[class],
  ol[class],
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  /* Set core body defaults */
  body {
    min-height: 100vh;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    font-family: var(--f-ubuntu-regular);
    background-color: var(--dark-gray);
    color: var(--white);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* iPhone styles */
    @supports (-webkit-touch-callout: none) {
      min-height: -webkit-fill-available;
    }
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  ul[class],
  ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:visited {
    color: inherit;
  }

  /* Make images easier to work with */
  img {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  article > * + * {
    margin-top: 1em;
  }

  button {
    padding: 0;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  input {
    outline: 0;
  }

  button {
    border: 0;
    outline: none;
  }

  [class*='--round'] {
    border-radius: 100%;
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  @media (hover: hover) {
    button:hover,
    a:hover {
      cursor: pointer;
    }
  }

  /*
  * Fonts
  */
  @font-face {
    font-family: 'ubuntu_regular';
    src: url('/fonts/ubuntu_regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'ubuntu_bold';
    src: url('/fonts/ubuntu_bold.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;
