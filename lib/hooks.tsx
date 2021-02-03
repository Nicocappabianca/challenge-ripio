import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Media } from './constants';

type media = {
  isS: boolean;
  isMaxMobile: boolean;
  isM: boolean;
  isL: boolean;
  isXL: boolean;
  isXXL: boolean;
  isiMac: boolean;
};

export const useMediaRender = (): media | undefined => {
  const [medias, setMedias] = useState<media>();

  const isS = useMediaQuery({ query: Media.small });
  const isMaxMobile = useMediaQuery({ query: '(max-width: 48em)' });
  const isM = useMediaQuery({ query: Media.medium });
  const isL = useMediaQuery({ query: Media.large });
  const isXL = useMediaQuery({ query: Media.extraLarge });
  const isXXL = useMediaQuery({ query: Media.extraExtraLarge });
  const isiMac = useMediaQuery({ query: Media.iMac });

  useEffect(() => {
    setMedias({
      isS,
      isMaxMobile,
      isM,
      isL,
      isXL,
      isXXL,
      isiMac
    });
  }, [isS, isM, isL, isXL, isXXL, isiMac]);

  return medias;
};
