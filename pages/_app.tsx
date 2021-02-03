import React from 'react';
import { AppProps } from 'next/app';

import { MediaContextProvider } from '@/lib/helpers';
import { globalStyles } from '@/lib/globalStyles';
// import { AppHead } from '@/components';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <MediaContextProvider>
      {/* <AppHead /> */}
      <Component {...pageProps} />
      <style jsx global>
        {globalStyles}
      </style>
    </MediaContextProvider>
  );
};
export default App;
